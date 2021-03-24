var express = require("express");
var router = express.Router();
const User = require("../model/User");
const Stock = require("../model/User");
const jwtMdlWr = require("../middleware/jwtMiddleWare");
router.patch("/", jwtMdlWr, async (req, res) => {
  const id = req.user._id;
  const stockId = req.body.stockId;
  const updateData = {
    productType: req.body.productType,
    quantity: req.body.quantity,
    price: req.body.price,
  };
  await User.findOneAndUpdate(
    { "_id": id, "stock._id": stockId },
    {$set:{ "stock.$": updateData}}
);//Oldu amk oha dlksdfgdf
res.json({msg:"success"});


});

module.exports = router;
