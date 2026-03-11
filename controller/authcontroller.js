const  bcrypt  = require('bcryptjs')
const User =require('../model/authmodel')
const  Jwt = require('jsonwebtoken')
const crypto=require('crypto')
const nodemailer=require('nodemailer')
const { url } = require('inspector')

exports.registeruser=async (req, res) => {
    try{

        const{name, email,password,role}=req.body;
        const makeit=await User.findOne({email})
        if(makeit){
            return res.status(400).json({message:'pleases login'})
        }
         
        const hashpassword=await bcrypt.hash(password,10)
        const craete= await User.create({
            name,
            email,
            password:hashpassword,
            role
        })

        await craete.save()

        return res.status(200).json({message:'user register successfully', user:{
            name:craete.name,
            email:craete.email,
            password:  craete.password,
        }
        })

    }catch(error){
        return res.status(500).json({message:error.message})
       
    }
};

exports.loginuser =async (req, res) => {
    
    try {
        const{email, password}=req.body

        const checkmail=await User.findOne({email})
        if(!checkmail){
           return res.status(400).json({message:'plsease regester you not create a profile'})
        }

        const matchpassword=await bcrypt.compare(password, checkmail.password)
        if(!matchpassword){
           return res.status(400).json({message:'invalid crditianl'})
        }

        const token= Jwt.sign({id: checkmail._id ,role: checkmail.role},'apple')
           return res.status(200).json({message:'login successfully',token,
           user:{
            id: checkmail._id,
            name:checkmail.name,
            email: checkmail.email,
            role: checkmail.role
           }

           })

    } catch (error) {
       return res.status(500).json({message:error.message})
    }
};

exports.forgotPassword= async (req, res)=>{

   try {

     const {email}=req.body;

    const user=await User.findOne({email})
     
    if(!user){
        res.status(400).json({message: 'user not found'})
    }

    const resetToken= crypto.randomBytes(20).toString('hex')  // what now happening is now create a random string string to hidden the password like hash

    user.resetPasswordToken=resetToken      // and here now we set token expried in DB
    user.resetPasswordExpires= Date.now()+3600000
    console.log(resetToken)

    await user.save();

   
    // now currently working is email sending 

    const transporter = nodemailer.createTransport({

        service: 'Gmail',
        auth: {

            user: 'lokeshbsccomputerscience@gmail.com',
            pass: 'vxfh cfcm rlgb waug'    // google password

        }
    });

    const resetUrl = `https://careeratextraatech.netlify.app/reset-password/${resetToken}`;

    const mailoption={
        to:user.email,
        from: 'lokeshbsccomputerscience@gmail.com',
        subject: 'Password Reset Request | Extraa Technologies',
        html:`<div style="font-family: sans-serif; background-color: #f4f4f4; padding: 40px 10px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a0d; border-radius: 12px; overflow: hidden; color: #d8d8d1;">
            
            <div style="padding: 30px; text-align: center; background-color: #1a1a0d; border-bottom: 1px solid #3f3f2f;">
                <h1 style="color: #ffff00; margin: 0; font-size: 24px;">Extraa Technologies</h1>
            </div>

            <div style="padding: 40px 30px; text-align: center;">
                <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 20px;">Forgot your password?</h2>
                <p style="font-size: 16px; line-height: 1.6; color: #d8d8d1; margin-bottom: 30px;">
                    It happens to the best of us! Click the button below to securely reset your password. This link will expire in 1 hour.
                </p>

                <a href="${resetUrl}" 
                   style="display: inline-block; background-color: #ffff00; color: #000000; padding: 14px 30px; font-weight: bold; font-size: 16px; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
                   Reset My Password
                </a>

                <p style="margin-top: 30px; font-size: 13px; opacity: 0.7;">
                    If you didn't request this, you can safely ignore this email.
                </p>
            </div>

            <div style="padding: 20px; background-color: #2b2b1d; text-align: center; font-size: 12px; color: #8c8c80;">
                <p>© 2024 Extraa Technologies. All rights reserved.</p>
                <p>Chennai, Tamil Nadu, India</p>
            </div>
        </div>
    </div>
    `
    }
           
    await transporter.sendMail(mailoption)

    res.status(200).json({message: 'reset mail send to your emial ID'})
    
   } catch (error) {
        
    res.status(400).json({message: error.message})
   }
}

exports.resetPassword=async(req,res)=>{

   try {
     const{token}=req.params;
     const {newPassword}=req.body


    if(!newPassword){
        return res.status(400).json({message: 'New password is required'})
    }

     const user= await User.findOne({
        
         resetPasswordToken: token,
         resetPasswordExpires: { $gt: Date.now() }
        
    })

    if(!user){
        return res.status(400).json({message:"Token is invalid or expired"})
    }

    const hashpassword=await bcrypt.hash(newPassword,10)
    user.password=hashpassword;
    user.resetPasswordToken= undefined;
    user.resetPasswordExpires= undefined;

     await user.save();

     return res.status(200).json({message: 'password has been reset successfully'})
    
    
   } catch (error) {
     return res.status(400).json({message: error.message})
   }


} 

// module.exports = {registeruser,loginuser};