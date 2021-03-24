var express = require('express');
var router = express.Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const jwtMiddleWare = require("../middleware/jwtMiddleWare");
/* GET home page. */
router.get('/',jwtMiddleWare,async (req, res)=> {
    const id = req.user._id;
    const user = await User.findOne({_id:id});
    res.json({
        user:user
    });
});
module.exports = router;