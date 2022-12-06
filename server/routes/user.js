const express = require('express');
const userModel = require('../models/userM');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const app = express.Router();

app.post('/regsiter', (req, res) => {
    userModel.find({ userName: req.body.userName }).then((user)=>{
        if(user.length){
            res.status(400).json('username exist..!');
        }else{
            let slat=10;
            bcryptjs.genSalt(salt).then((saltvalue) => {
                bcryptjs.hash(req.body.password, saltvalue).then((hashpassword)=>{
                    userModel.create({userName: req.body.userName, password: hashpassword}).then((user)=>{
                        res.status(200).json(`${userName} you are registered`);
                    }).catch((err)=>{
                        res.status(400).json('Process Issue: Not registered');
                    })
                }).catch((err)=>{
                    res.status(400).json('Hash password not generated');
                })
            }).catch((err)=>{
                res.status(400).json("salt not generated");
            })
        }
    })
})

app.post('/login', (req,res)=>{
    userModel.find({userName: req.body.userName}).then(async (user) => {
        if(user.length){
            const value = await bcryptjs.compare(req.body.password, user[0].password )
            if(value){
                const jwt_Token = jwt.sign({userName : req.body.userName}, process.env.SECRET_KEY)
                res.status(200).json({AuthToken: jwt_Token});
            }else{
                res.status(400).json('Invalid Password');
            }
        }else{
            res.status(400).json("User not exist...!")
        }
    }).catch((err) => {
        res.status(400).json("Network ISSUE");
    })
})

module.exports = app;