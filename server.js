require('dotenv').config()

const express=require('express');
const connectdb = require('./config/db');

const router = require('./routes/Auth.routes');
const OrgRouter=require('../AI-Analyst/routes/org.routes')
const app=express()
app.use(express.json())



connectdb()



app.use("/api/v1",router)


app.use("/api/org",OrgRouter)
app.listen(3000)