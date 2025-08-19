// api/deals.js — minimal success response
module.exports = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Deals endpoint working",
  });
};
