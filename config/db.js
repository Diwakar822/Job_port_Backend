const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    console.log('db connected successfully')
    } catch (error) {
        console.log('not connected',error.message)
    }
    
}

module.exports= connectDB