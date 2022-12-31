const Express = require("express")
const app = Express.Router()
const UserModel = require("../Models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

app.post("/dummy",(req,res)=>{
    UserModel.find({userName:req.body.userName}).then((user)=>{
        if(user.length){
            res.status(400).json("Username Exit..!!!")
        }else{
          
        }
    })
})

module.exports = app;