const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json({limit:'30mb', extended:true}))

require("dotenv").config();


mongoose.connect(process.env.DB).then(() => {
    app.listen(process.env.PORT, (err) => {
        if(!err){
            console.log(`The server running ${process.env.PORT} and db connected`)
        }
    });
})