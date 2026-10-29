const express=require('express')
const { signup, login, Forgot, res } = require('../controllers/Auth.controllers')
const router=express.Router()



router.post("/signup",signup)
router.post("/login",login)
router.post("/forgot",Forgot)
router.post("/reset/:token",res)



module.exports=router

