const mongoose = require('mongoose');
const express = require('express');
const userController = require('./routes/user');

const app = express();
app.use(express.json({limit:'30mb', extended:true}))

require("dotenv").config();

//connectivity
mongoose.connect(process.env.DB).then(() => {
    app.listen(process.env.PORT, (err) => {
        if(!err){
            console.log(`The server running ${process.env.PORT} and db connected`)
        }
    });
})

app.get("/", (req,res) => {
    console.log("Hello Backend");
    res.send("HEllo backend")
})

//controlling other pages
app.use('/', userController);