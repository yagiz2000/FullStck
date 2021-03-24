var express = require("express");
var router = express.Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const jwtMiddleWare = require("../middleware/jwtMiddleWare");

router.post("/",async (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const user = await User.findOne({userName:userName});
    if(!user) return res.status(404).send("User not found");
    const passwordLogic = await bcrypt.compare(password,user.password);
    if(!passwordLogic) return res.status(404).send("Password is wrong");
    //JWT Token oluşturma
    const token =  jwt.sign({_id:user._id},process.env.SCRT_KEY);
    res.setHeader('auth-token',token);
    res.json({
        token:token,
        userName
    });
    
});

module.exports = router;