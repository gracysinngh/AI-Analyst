const mongoose=require('mongoose')

async function connectdb(){
    await mongoose.connect(process.env.MONGO_URL)
    console.log("mongo db connection successfully done")
}


module.exports=connectdb