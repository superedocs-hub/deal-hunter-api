// api/deals.js
module.exports = (req, res) => {
  const { zip = "" } = req.query;
  const zips = String(zip).split(",").filter(Boolean);
  const base = zips.length ? zips : ["92101","92102","92103","92104","92105","92114","92115","92116"];
  const mk = (z,s,i,p,a,b,c)=>({zip:z,store:s,item:i,price:p,serviceFee:a,deliveryFee:b,otherFees:c});
  const data = [];
  for (const z of base) {
    data.push(
      mk(z,"Walmart","Water (24-pack)",4.98,0.35,0,0.10),
      mk(z,"Vons","Eggs (12ct)",3.79,0.60,0.50,0),
      mk(z,"Target","Diapers (Size 4)",19.99,2.50,2.99,0.50)
    );
  }
  res.status(200).json({ success:true, count:data.length, data });
};
