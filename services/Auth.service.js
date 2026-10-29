const { User } = require("../models/Auth.models")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const Signup=async(email,body)=>{
    const existingUser=await User.findOne({email})
    if(existingUser){
        throw new Error("user with this perticular email already exists")
    }
    const user=await User.create(body)
    return user
}
const Login=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error("user not found")
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("password didnt match try again")
    }
    const AccToken=jwt.sign({id:user._id},process.env.AccSecKey,{expiresIn:"2d"})
    return AccToken
}
const forgot=async(email)=>{
    const user=await User.findOne({
        email
    })
    if(!user){
        throw new Error("user not found")
    }
    const resetToken=crypto.randomBytes(32).toString('hex')
    const hashedToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    user.resetPasswordToken=hashedToken
    user.resetPasswordExpire=Date.now()+1000*60*60
    await user.save()
    return resetToken
}

// const Reset=async(newPassword,token)=>{
//     if(!newPassword){
//         throw new Error("no newPassword Assigned by user")
//     }
//      if (!token) {
//         throw new Error("Reset token is required");
//     }

//     const hashedPassword=crypto.createHash('sha256').update(token).digest('hex')
//     const user=await User.findOne({
//         resetPasswordToken:hashedPassword,
//         resetPasswordExpire:{$gt:Date.now()}
//     })
//     if(!user){
//         throw new Error("expired token")
//     }

//     user.password=newPassword
//     user.resetPasswordToken=null
//     user.resetPasswordExpire=null
//     await user.save()
//     return{
//         message:"password reset done"
//     }

// }
const Reset = async (newPassword, token) => {
    if (!newPassword) {
        throw new Error("no newPassword Assigned by user");
    }

    if (!token) {
        throw new Error("Reset token is required");
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    console.log("TOKEN FROM REQUEST:", token);
    console.log("HASHED TOKEN:", hashedToken);

    const user = await User.findOne({
        resetPasswordToken: hashedToken
    });

    console.log("USER FOUND:", user);

    if (!user) {
        throw new Error("Token is invalid");
    }

    console.log("TOKEN EXPIRY:", user.resetPasswordExpire);
    console.log("CURRENT TIME:", Date.now());

    if (user.resetPasswordExpire <= Date.now()) {
        throw new Error("Token expired");
    }

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    return {
        message: "password reset done"
    };
};
module.exports={
    Signup,
    Login,
    forgot,
    Reset
}