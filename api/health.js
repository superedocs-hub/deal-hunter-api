// api/health.js
export default function handler(req, res) {
  res.status(200).json({ ok: true, route: "/api/health", time: new Date().toISOString() });
}
