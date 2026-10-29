require('dotenv').config()

const express=require('express');
const connectdb = require('./config/db');

const router = require('./routes/Auth.routes');
const app=express()
app.use(express.json())



connectdb()



app.use("/api/v1",router)



app.listen(3000)