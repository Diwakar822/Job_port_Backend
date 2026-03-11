const express = require('express')
const router=express.Router()
const{registeruser, loginuser, resetPassword, forgotPassword}=require('../controller/authcontroller')
const authmiddleware=require('../Middleware/authMiddleware')
const {verfiyAdmin,verfiyuser}=require('../AdminRoutes/roleMiddleware')


router.get( '/dashboard',authmiddleware,verfiyAdmin,(req,res)=>{
     return res.status(200).json({message: `welcom admine  ${req.user.id}`})
})

router.get('/profile', authmiddleware,(req,res)=>{
     return res.status(200).json({message: `welcome, ${req.user.role}!`, user:req.user,})
})

router.post('/forgot-password', forgotPassword )
router.post('/reset-password/:token',resetPassword)

router.post('/register', registeruser)
router.post('/login', loginuser)


module.exports= router;