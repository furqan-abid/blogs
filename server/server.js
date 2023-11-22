const express = require("express");
const  userRouter  = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const cors = require('cors');
const connectDatabase = require('./config/db');
require('dotenv').config({path: 'config/config.env'});
const path = require('path')
const app = express();

const _dirname = path.dirname('')

const buildPath = path.join(_dirname,"../client/build")

app.use(express.static(buildPath))

app.get("/*",function(req,res){
    res.sendFile(__dirname,"../client/build/index.html"),
    function(err){
        if(err){
            res.status(500).send(err)
        }
    }
})



app.use(cors());

app.set("view engine","ejs");
app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/blogs",blogRouter);

app.use("/api",(req,res,next) =>{
    res.send("hello")
})

//define port


//handling uncaught exceptions
process.on('uncaughtException', function(err) {
    console.log("Error: " + err.message);
    console.log('shutting down the server due to uncaught exception')
    process.exit(1);
})


//connecting database
connectDatabase()

const server= app.listen(4000,()=>{
    console.log(`server is runing on ${process.env.Port}`);
})

//Unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })
})