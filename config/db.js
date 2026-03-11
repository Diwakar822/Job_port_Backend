const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        await mongoose.connect('mongodb+srv://diwakar:lokeshMsd1@cluster0.yzkmm.mongodb.net/job_portal')
    console.log('db connected successfully')
    } catch (error) {
        console.log('not connected',error.message)
    }
    
}

module.exports= connectDB