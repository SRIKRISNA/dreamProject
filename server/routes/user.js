const Express = require("express")
const app = Express.Router()
const UserModel = require("../Models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

app.post("/signup",(req,res)=>{
    UserModel.find({userName:req.body.userName}).then((user)=>{
        if(user.length){
            res.status(400).json("Username Exit..!!!")
        }else{
          let salt = 10;
          bcryptjs.genSalt(salt).then((saltvalue)=>{
              bcryptjs.hash(req.body.password,saltvalue).then((hashpassword)=>{
                  UserModel.create({userName:req.body.userName,password:hashpassword}).then((user)=>{
                    res.status(200).json("User Added")
                  }).catch((err)=>{
                    res.status(400).json("Process Issue")
                  })
              }).catch((err)=>{
                res.status(400).json("Process Issue")
              })
          }).catch((err)=>{
            res.status(400).json("Process Issue")
          })
        }
    })
})

app.post("/login",(req,res)=>{
    UserModel.find({userName:req.body.userName}).then(async (user)=>{
        if(user.length){
           const value = await bcryptjs.compare(req.body.password,user[0].password)
           if(value){
            const jwt_Token = jwt.sign({userName:req.body.userName},process.env.SECRET_KEY)
            res.status(200).json({AuthToken : jwt_Token})
           }else{
            res.status(400).json("Invalid Password")
           }
        }else{
            res.status(400).json("User Not Exist")
        }
    }).catch((err)=>{
        res.status(400).json("Network Issue")
    })
})

module.exports = app;
