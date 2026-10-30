const express=require('express')
const upload = require('../middleware/upload')
const { ReadAndSave, RagAns } = require('../controllers/pdf.controllers')


const router=express.Router()


router.post("/saveEmbed/:organizationId",upload.single("pdf"),ReadAndSave)
router.post("/RagAns",RagAns)

module.exports=router