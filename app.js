//external imports
const cookieParser = require("cookie-parser");
const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose")
const path = require("path")

//internal imports
const {notFoundHandler,errorHandler}= require("./middleware/common/errorHandler")


const app = express();

// process.env.APP_NAME

// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

.then(()=>console.log("Connection successful"))
.catch(err =>console.log(err))

// request parser
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//set view engine
app.set("view engine","ejs")

//set static folder
app.use(express.static(path.join(__dirname,"public")))

//pars cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing set up

//error handling


//404 not found handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler)


app.listen(process.env.PORT,()=>{
  console.log(`app listing to port ${process.env.PORT}`);
})