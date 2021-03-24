const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config")
const app = express();
//const port = 8800;
const registerUser = require("./routes/registerUser");
const loginUser = require("./routes/loginUser");
const privateRoute = require("./routes/privateRoute");
const addStock = require("./routes/addStock");
const updateStock = require("./routes/updateStock");
const deleteStock = require("./routes/deleteStock");
const getStocks = require("./routes/getStocks");
//body parser paketiyle body'deki datayı okuyabilfiriz
app.use(express.urlencoded({ extended: true }));//Bu paketi routing işlemlerinden önce yap yoksa bodyParsing işlemi gerçekleşmez.
app.use(express.json());//Herhangi bir request yaptığımızda body parser çalışacak.
app.use(cors({origin: true})); // Allowing Cross-Origin Requests
//importing posts 

//ROUTES
app.get("/",(req,res)=>{
  res.send("hello world");
});
app.use("/register",registerUser);
app.use("/login",loginUser);
app.use("/secret", privateRoute);
app.use("/addStock",addStock);
app.use("/updateStock",updateStock);
app.use("/deleteStock",deleteStock);
app.use("/getStocks",getStocks);
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);
//Connect to DB
 //mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true }  ,()=>console.log("connected to db"));
const connecDb = ()=>{
    mongoose.connect(process.env.CON_STR, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(()=>console.log("connection established"))
    .catch(error => console.log(error));
}
connecDb();
//app.listen(port);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

/* 
 exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
}); */
exports.app = functions.https.onRequest(app);

