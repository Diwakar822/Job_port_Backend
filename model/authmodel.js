const mongoose=require('mongoose')

const createmodel= new mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, enum:['user','admin'], default: 'user'},
    resetPasswordToken: String,
    resetPasswordExpires: Date
})
module.exports=mongoose.model('User', createmodel)