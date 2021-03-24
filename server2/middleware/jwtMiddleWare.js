const jwt = require("jsonwebtoken");

module.exports=function(req,res,next){
    const token = req.headers['authorization'];
    console.log(token);
    //const token = req.header('auth-token');
    const verified = jwt.verify(token,process.env.SCRT_KEY);//kullanıcının id'si dönecek.
    req.user= verified;
    next();
}