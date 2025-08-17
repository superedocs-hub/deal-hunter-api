// api/deals.js

export default function handler(req, res) {
  // Basic GET endpoint
  if (req.method === "GET") {
    res.status(200).json({
      success: true,
      message: "HoodSignals Deals API is live!",
      example: {
        item: "Water 24-pack",
        price: "$3.99",
        zip: "92105",
        feeFree: true,
      },
    });
  } 
  // For unsupported methods
  else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
