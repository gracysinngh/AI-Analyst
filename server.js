require('dotenv').config()

const express=require('express');
const connectdb = require('./config/db');

const router = require('./routes/Auth.routes');
const OrgRouter=require('../AI-Analyst/routes/org.routes')
const PdfRouter=require('../AI-Analyst/routes/pdf.routes')
const app=express()
app.use(express.json())


console.log("Gemini Key:", process.env.GEMINI_KEY ? "FOUND" : "MISSING");
connectdb()



app.use("/api/v1",router)


app.use("/api/org",OrgRouter)

app.use("/api/upload",PdfRouter)
app.listen(3000)