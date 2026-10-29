const{GoogleGenAI}=require('@google/genai')

const ai=new GoogleGenAI({
    apikey:process.env.GEMINI_KEY
})


module.exports=ai