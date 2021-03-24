var express = require('express');
var router = express.Router();
const User = require("../model/User");
const jwtMdlwr = require("../middleware/jwtMiddleWare");
/* GET home page. */

router.delete('/',jwtMdlwr,async (req,res)=>{
    const id = req.user._id;
    const postId = req.body.postId;
    const resy = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { stock: { _id:postId} } },
        { new: true }
    )   
    res.send(resy);
})

module.exports = router;
