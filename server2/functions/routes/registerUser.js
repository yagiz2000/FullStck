var express = require("express");
var router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const user = new User({
      userName: req.body.userName,
      password: hashedPassword
    });
    const userExisting = await User.findOne({userName:user.userName});
    if(userExisting) return res.status(400).send("This user name is already taken");
    const registeringUser = await user.save();
    res.send(registeringUser);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
