const ai = require("../config/ai")
const PDF = require("../models/pdf.models")
const { GenerateEmbedding } = require("./pdf.services")
const mongoose = require("mongoose");
const Retrieval=async(query,organizationId)=>{
    const queryEmbedding=await GenerateEmbedding(query)
     const orgDocs = await PDF.find({
        organizationId: new mongoose.Types.ObjectId(organizationId)
    }).select("text organizationId");
    const VectorSearch=await PDF.aggregate([
        {
            $vectorSearch:{
                index:"vector_index",
                path:"embedding",
                queryVector:queryEmbedding,
                numCandidates:50,
                limit:5,
                filter:{
                    organizationId:new mongoose.Types.ObjectId(organizationId)
                }
            }
        },{
            $project:{
                text:1,
                metadata:1,
                organizationId:1,
                score:{
                    $meta:"vectorSearchScore"
                }
            }
        }
    ])
    const context=VectorSearch.map((res,index)=>`$${index+1} .${res.text}`).join("\n \n")
    console.log("VECTOR SEARCH RESULT:", VectorSearch);
console.log("CONTEXT:", context);
    const ans=await ai.models.generateContent({
        model:"gemini-3.6-flash",
         contents: `
You are a helpful AI assistant.

Answer the user's question using ONLY the information provided in the context.

CONTEXT:
${context}

USER QUESTION:
${query}

Instructions:
- If the answer is present in the context, answer it clearly.
- Do not use outside knowledge.
- If the answer is not present in the context, respond exactly:
"Could not find the relevant answer from this context."
`
    })
    return ans.text
}


module.exports=Retrieval