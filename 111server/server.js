const mongoose = require('mongoose');
const express = require('express');
const UserModel = require('./models/userM')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const userController = require('./routes/userR');

const app = express();
app.use(express.json({limit:'30mb', extended:true}))

require("dotenv").config();

PORT = 5000
DB= 'mongodb+srv://krishna:spkrishna@krishnacluster.xjap0dj.mongodb.net/dreamProject?retryWrites=true&w=majority/'
//connectivity
mongoose.connect(DB).then(() => {
    app.listen(PORT, (err) => {
        if(!err){
            console.log(`The server running ${process.env.PORT} and db connected`)
        }
    });
})

app.get("/", (req,res) => {
    console.log("Hello Backend");
    res.json("HEllo backend")
})

//controlling other pages
app.use('/user', userController);