require('dotenv').config();
const express= require('express');
const connectDB = require('./config/db')
const cors= require('cors')
const authrouter=require('./router/authrouter')
const jobRoutes=require('./router/jobRoutes')
const jobApplicationRoutes=require('./router/jobApplicationRoutes')



const app=express();

app.use(cors({
   origin: [ "http://localhost:5173", "https://careeratextraatech.netlify.app", ],
   credentials: true
}))


app.use(express.json())

app.use('/api/auth', authrouter)
app.use('/api/jobs', jobRoutes)
app.use('/api/application', jobApplicationRoutes)

app.use('/uploads', express.static('uploads'))

connectDB()

const PORT= process.env.PORT || 5000

app.listen(PORT,()=>{
   console.log(`server is run on port ${PORT}`)
})
