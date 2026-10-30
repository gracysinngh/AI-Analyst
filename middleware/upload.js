const multer=require('multer')



const storage=multer.diskStorage({
    filename:function filename(req,file,cb){
        cb(null,file.originalname)
    },
    destination:function destination(req,file,cb){
        cb(null,'uploads/')
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype=="application/pdf"){
        cb(null,true)
    }else{
        throw new Error("only pdf types are allowed")
    }
}


const upload=multer({storage,fileFilter})


module.exports=upload