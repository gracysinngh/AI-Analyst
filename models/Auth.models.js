const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Organization"
    }
})

UserSchema.pre("save",async function(next){
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);

})

const User=mongoose.model('User',UserSchema)



module.exports={
    User
}
