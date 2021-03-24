var express = require('express');
var router = express.Router();
const User = require("../model/User");
const jwtMdlWr = require("../middleware/jwtMiddleWare");
router.post('/',jwtMdlWr,async (req,res)=>{
    const id = req.user._id;
    const stockObject = {
      productType:req.body.productType,
      quantity:req.body.quantity,
      price:req.body.price
    }
    const updatedUser = await User.updateOne({_id:id},{$push:{stock: stockObject}});
    res.json(updatedUser);
    

})

module.exports = router;