const express= require('express')
const router= express.Router();
const {createJob, getalljobs , getJobById, updatejobs, Deletejob}=require('../controller/jobController')
const authmiddleware = require('../Middleware/authMiddleware')
const {verfiyAdmin}= require('../AdminRoutes/roleMiddleware');


router.post('/create', authmiddleware, verfiyAdmin, createJob)
router.get('/jobs', getalljobs )
router.get('/jobs/:id', getJobById)
router.put('/:id', authmiddleware, verfiyAdmin, updatejobs)
router.delete('/:id', authmiddleware, verfiyAdmin, Deletejob)

module.exports= router;