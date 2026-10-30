const mongoose=require('mongoose')



const PdfSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    embedding:{
        type:[Number],
        required:true
    },
    metadata:{
        source:{
            type:String
        }
    },
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Organization"
    }
})

const PDF=mongoose.model('PDF',PdfSchema)

module.exports=PDF