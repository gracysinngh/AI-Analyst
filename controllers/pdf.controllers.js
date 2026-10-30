const PDF = require("../models/pdf.models")
const { GenerateEmbedding } = require("../services/pdf.services")
const Retrieval = require("../services/Rag.services")
const { ChunkText, ChunkTextByWords } = require("../utility/chunk")
const { readFile } = require("../utility/read")

const ReadAndSave=async(req,resp)=>{
    const read=await readFile(req.file.path)
    const res=[]
    const chunks=await ChunkTextByWords(read,500,50)
    for(const chunk of chunks){
        const embedding=await GenerateEmbedding(chunk)
        const save=await PDF.create({
            text:chunk,
            embedding:embedding,
            metadata:{
                source:req.file.path
            },
            organizationId:req.params.organizationId
        })
        res.push(save)
    }
    return resp.json({
        success:true,
        chunks:res.length
    })
}

const RagAns=async(req,resp)=>{

    const ans=await Retrieval(req.body.query,req.body.organizationId)
    resp.json({
        success:true,
        data:ans
    })
}

module.exports={
    ReadAndSave,
    RagAns
}