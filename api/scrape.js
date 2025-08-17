// api/scrape.mjs
export default async function handler(req, res) {
  try {
    res.status(200).json({
      success: true,
      message: "Deal Hunter API is running",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

