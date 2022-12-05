const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json({limit:'30mb', extended:true}))

require("dotenv").config();


mongoose.connect(process.env.db_url).then(() => {
    app.listen(process.env.port, (err) => {
        if(!err){
            console.log(`The server running at ${port} and db connected`)
        }
    });
})