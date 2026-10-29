const express=require('express')
const { Auth } = require('../middleware/Auth')
const { Rbac } = require('../middleware/Rbac')
const { OrganizationControllers, GetOrganization } = require('../controllers/Organizaton.controller')
const { OrganizationMiddleware } = require('../middleware/Organization.middlewate')
const router=express.Router()



router.post("/create",Auth,Rbac("admin"),OrganizationControllers)
router.get("/me",Auth,OrganizationMiddleware,GetOrganization)


module.exports=router