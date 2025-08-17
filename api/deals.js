// api/deals.js
module.exports = function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { zip = "" } = req.query;
  const zips = String(zip).split(",").filter(Boolean);
  const base = zips.length
    ? zips
    : ["92101","92102","92103","92104","92105","92114","92115","92116"];

  const make = (zip, store, item, price, s, d, o) => ({
    zip, store, item, price,
    serviceFee: s, deliveryFee: d, otherFees: o
  });

  const data = [];
  for (const z of base) {
    data.push(
      make(z,"Walmart","Water (24-pack)",4.98,0.35,0.0,0.10),
      make(z,"Vons","Eggs (12ct)",3.79,0.60,0.50,0.0),
      make(z,"Target","Diapers (Size 4)",19.99,2.50,2.99,0.50)
    );
  }

  return res.status(200).json({ success: true, count: data.length, data });
};
