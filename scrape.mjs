// api/scrape.mjs
// Minimal Vercel serverless function with API_KEY auth + ZIP rotation
// Expects: Authorization: Bearer <API_KEY>
// Accepts JSON body: { vendors?: string[], zipStart?: string, zipEnd?: string, query?: string }
// Rotation: If no zip provided, picks from ROTATION_ZIPS by hour-of-day.

export default async function handler(req, res) {
  try {
    // --- Auth gate ---
    const required = (process.env.API_KEY || '').trim();
    if (required) {
      const header = req.headers.authorization || '';
      const ok = header === `Bearer ${required}`;
      if (!ok) return res.status(401).json({ error: 'unauthorized' });
    }

    // --- Parse input ---
    const body = typeof req.body === 'object' && req.body !== null ? req.body : {};
    const vendors = Array.isArray(body.vendors) && body.vendors.length ? body.vendors : ['walmart','instacart'];
    const query = (body.query || 'Enfamil baby formula').toString();

    // --- ZIP rotation ---
    const ROTATION_ZIPS = ['92101','92102','92103','92104','92105','92106','92107','92108','92109','92110','92111','92112','92113','92114','92115','92116'];
    const hour = new Date().getHours(); // local server time
    const rotatedZip = ROTATION_ZIPS[ hour % ROTATION_ZIPS.length ];
    // If caller pinned a zip via zipStart/zipEnd and both equal, respect it. Else use rotation.
    const requestedZip = (body.zipStart && body.zipEnd && body.zipStart === body.zipEnd) ? body.zipStart : rotatedZip;

    // --- Mock data (replace with real scraping later) ---
    const items = [{
      vendor: vendors[0],
      store: vendors[0] === 'walmart' ? 'Walmart' : 'Instacart',
      zip: requestedZip,
      product: query,
      price: 18.97,
      fees: { service: 0, delivery: 0, tip: 0, other: 0 },
      ebt: true,
      pickup: true,
      url: vendors[0] === 'walmart'
        ? 'https://www.walmart.com/search?q=' + encodeURIComponent(query)
        : 'https://www.instacart.com/store/search?q=' + encodeURIComponent(query)
    }];

    return res.status(200).json(items);
  } catch (e) {
    return res.status(500).json({ error: 'server_error', detail: String(e && e.message || e) });
  }
}
