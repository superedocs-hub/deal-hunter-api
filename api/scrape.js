export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    message: "Deal Hunter API running",
    timestamp: new Date().toISOString()
  });
}
