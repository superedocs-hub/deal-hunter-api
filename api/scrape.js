export default function handler(req, res) {
  // 1. Check API key
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (!token || token !== process.env.API_KEY) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  // 2. Handle GET or POST
  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      message: 'Deal Hunter API running (protected)',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    // Example placeholder scraper logic
    const body = req.body || {};
    return res.status(200).json({
      ok: true,
      received: body,
      note: 'Scraper logic goes here'
    });
  }

  return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
}
