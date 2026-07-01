// ════════════════════════════════════════════════════════════════════════════
// Cloudflare Pages Function — /api/partner
//
// POST : capture a "Partner with AICV" inquiry (Name / Email / note) → D1.
// GET  : key-gated read of recent inquiries (the day-one stopgap so leads can be
//        pulled with ZERO email dependency).
//
// Mirrors the verified aiqna-agent partner-signup pattern (D1 + Turnstile +
// honeypot + IP-hash rate-limit), trimmed to AICV's three fields.
//
// Email notification is a deliberate FAST-FOLLOW (Shape 2): the D1 row is the
// guaranteed capture; native CF Email Sending to sat@aicv.co drops in where marked
// once the send_email binding + onboarded domain exist. A missing email must never
// fail a submit. See STATE.md.
//
// Bindings (set on the .org Pages project — dashboard):
//   DB               D1 database
//   TURNSTILE_SECRET Turnstile secret key (falls back to the CF test secret)
//   SALT             salt for IP hashing (forensics only; not an identity gate)
//   INQUIRY_KEY      secret for the key-gated GET read
// ════════════════════════════════════════════════════════════════════════════

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEST_TURNSTILE_SECRET = '1x0000000000000000000000000000000AA'; // CF "always passes" test secret

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });

const clip = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : '');

async function sha256Hex(s) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function verifyTurnstile(env, token, ip) {
  const secret = env.TURNSTILE_SECRET || TEST_TURNSTILE_SECRET;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token || '');
  if (ip) form.append('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const d = await r.json();
    return !!d.success;
  } catch {
    return false;
  }
}

// Idempotent, self-healing — a submit never 500s on a missing table.
async function ensureTable(env) {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS inquiries (
       id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, note TEXT NOT NULL,
       status TEXT NOT NULL DEFAULT 'new', ip_hash TEXT,
       emailed INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)`,
  ).run();
}

export async function onRequestPost({ request, env }) {
  let body = {};
  try { body = await request.json(); } catch { /* empty */ }

  // Honeypot — a hidden field bots fill in. Silently accept (200) so the bot thinks
  // it worked, but store nothing.
  if (clip(body.company, 200)) return json({ ok: true });

  const name = clip(body.name, 120);
  const email = clip(body.email, 200);
  const note = clip(body.note, 2000);

  if (!name || !email || !note) {
    return json({ ok: false, error: 'missing', message: 'Please fill in your name, email, and a note.' }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'email', message: "That email address doesn't look right." }, 400);
  }

  const ip = request.headers.get('CF-Connecting-IP') || '';

  const passed = await verifyTurnstile(env, body['cf-turnstile-response'], ip);
  if (!passed) {
    return json({ ok: false, error: 'turnstile', message: 'That spam check didn’t go through — please try again.' }, 403);
  }

  if (!env.DB) {
    return json({ ok: false, error: 'store', message: 'The form backend isn’t configured yet. Please email sat@aicv.co.' }, 500);
  }
  await ensureTable(env);

  const ipHash = await sha256Hex((env.SALT || 'aicv-dev-salt') + '|' + (ip || 'noip'));

  // Soft anti-spam: no more than 5 inquiries per device-IP in 24h. Not a hard identity
  // gate — just a spam ceiling.
  try {
    const since = new Date(Date.now() - 86400000).toISOString();
    const recent = (await env.DB.prepare('SELECT count(*) n FROM inquiries WHERE ip_hash = ? AND created_at >= ?')
      .bind(ipHash, since).first())?.n ?? 0;
    if (recent >= 5) {
      return json({ ok: false, error: 'rate', message: 'That’s a few in a row from here — email sat@aicv.co and we’ll sort it out.' }, 429);
    }
  } catch { /* non-fatal */ }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  try {
    await env.DB.prepare(
      'INSERT INTO inquiries (id, name, email, note, status, ip_hash, emailed, created_at) VALUES (?,?,?,?,?,?,?,?)',
    ).bind(id, name, email, note, 'new', ipHash, 0, now).run();
  } catch {
    return json({ ok: false, error: 'store', message: 'Something went wrong saving that. Please email sat@aicv.co.' }, 500);
  }

  // ── FAST-FOLLOW (Shape 2): native CF Email Sending notification to sat@aicv.co goes
  // here once the send_email binding + onboarded domain exist. Non-fatal — the row above
  // is the guaranteed capture; a missing/failed email must never fail the submit. On
  // success, UPDATE inquiries SET emailed = 1 WHERE id = ?.

  return json({ ok: true, id });
}

// Key-gated read — the day-one stopgap. Pull recent inquiries with zero email dependency.
export async function onRequestGet({ request, env }) {
  const key = new URL(request.url).searchParams.get('key') || '';
  // Fail closed: reject if the key is unset on the server, missing/empty on the
  // request, or mismatched. No PII leaves this endpoint without a valid key.
  if (!env.INQUIRY_KEY || !key || key !== env.INQUIRY_KEY) {
    return json({ ok: false, error: 'auth' }, 401);
  }
  if (!env.DB) return json({ ok: false, error: 'store' }, 500);
  await ensureTable(env);
  const rows = (await env.DB.prepare(
    'SELECT id, name, email, note, status, created_at FROM inquiries ORDER BY created_at DESC LIMIT 200',
  ).all())?.results ?? [];
  return json({ ok: true, count: rows.length, inquiries: rows });
}
