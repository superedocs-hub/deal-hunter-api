export default function handler(req, res) {
  res.status(200).json({
    success: true,
    message: "Deal Hunter API is running",
    timestamp: new Date().toISOString()
  });
}

