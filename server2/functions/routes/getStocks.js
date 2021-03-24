var express = require('express');
var router = express.Router();
const User = require("../model/User");
const jwtMdlwr = require("../middleware/jwtMiddleWare");
/* GET home page. */

router.get('/',jwtMdlwr,async (req,res)=>{
    const id = req.user._id;
    const response = await User.findOne({_id:id});
    res.send(response.stock);
})

module.exports = router;
