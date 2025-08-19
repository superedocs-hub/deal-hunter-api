module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    route: "/api/deals",
    sample: [{ id: 1, title: "Test deal" }],
    ts: new Date().toISOString(),
  });
};
