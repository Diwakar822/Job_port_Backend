const express = require('express')
const { saveJob, getSavedJobs, unsaveJob } = require('../controller/saveJobController')
const authmiddleware = require('../Middleware/authMiddleware')

const router=express.Router()

router.post('/save/:jobId', authmiddleware, saveJob)
router.get('/saved', authmiddleware, getSavedJobs)
router.delete('/unsave/:jobId', authmiddleware, unsaveJob)

module.exports=router;