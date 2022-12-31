const express = require("express");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userM");
var cors = require("cors");
//const { checkExistingUser, generatePasswordHash } = require("../utility")
const app = express.Router();
dotenv.config();

app.use(cors())

app.post("/logout", (req, res) => {
    res.status(200).send("logout works");
});

app.post("/signup",(req,res)=>{
    UserModel.find({userName:req.body.userName}).then((user)=>{
        console.log(req.body.userName);

        if(user.length){
            res.status(400).json("Username Exit")

        }else{
          let salt = 10;
          bcryptjs.genSalt(salt).then((saltvalue)=>{
              bcryptjs.hash(req.body.password,saltvalue).then((hashpassword)=>{
                  UserModel.create({userName:req.body.userName,password:hashpassword}).then((user)=>{
                   // console.log(req.body);
                    res.status(200).json("User Added")
                  }).catch((err)=>{
                    res.status(400).json("Process Issue",err)
                  })
              }).catch((err)=>{
                res.status(400).json("Process Issue",err)
              })
          }).catch((err)=>{
            res.status(400).json("Process Issue",err)
          })
        }
    })
})

app.post("/login",(req,res)=>{
    //comparing password
    UserModel.find({userName: req.body.userName}).then((userData) =>{
        if(userData.length){
            bcryptjs.compare(req.body.password, userData[0].password).then((val)=> {
                if(val){
                    const authToken= jwt.sign(userData[0].userName, process.env.SECRET_KEY);
                    res.status(200).send({authToken});
                }
                else{
                    res.status(400).send("Invalid password")
                }
            })
        }else{
            res.status(400).send("Unauthorized user")
        }
    })
    //res.status(200).send("login works")
});

module.exports = app;


// const express = require('express');
// const UserModel = require('../models/userM');
// const jwt = require('jsonwebtoken');
// const bcryptjs = require('bcryptjs');
// const app = express.Router();
// var cors = require("cors");
// app.use(cors())


// app.post('/register', (req, res) => {
//     UserModel.find({ userName:req.body.userName }).then((user)=>{
//         if(user.length){
//             res.status(400).json('username exist..!');
//         }else{
//             let salt=10;
//             bcryptjs.genSalt(salt).then((saltvalue) => {
//                 bcryptjs.hash(req.body.password, saltvalue).then((hashpassword)=>{
//                     UserModel.create({userName:req.body.userName, password:hashpassword}).then((user)=>{
//                         res.status(200).send("you are registered");
//                     }).catch((err)=>{
//                         res.status(400).send('Process Issue: Not registered');
//                     })
//                 }).catch((err)=>{
//                     res.status(400).json('Hash password not generated');
//                 })
//             }).catch((err)=>{
//                 res.status(400).json("salt not generated");
//             })
//         }
//     })
// })

// app.post('/login', (req,res)=>{
//     UserModel.find({userName: req.body.userName}).then(async (user) => {
//         if(user.length){
//             const value = await bcryptjs.compare(req.body.password, user[0].password )
//             if(value){
//                 const jwt_Token = jwt.sign({userName : req.body.userName}, process.env.SECRET_KEY)
//                 res.status(200).json({AuthToken: jwt_Token});
//             }else{
//                 res.status(400).json('Invalid Password');
//             }
//         }else{
//             res.status(400).json("User not exist...!")
//         }
//     }).catch((err) => {
//         res.status(400).json("Network ISSUE");
//     })
// })

// module.exports = app;