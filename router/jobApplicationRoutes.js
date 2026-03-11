const express = require('express')
const authmiddleware = require('../Middleware/authMiddleware')
const router= express.Router()
const upload=require('../Middleware/uploadResume')
const {applyJob, getAllApplication, getMyApplications, getMyApplicationsById }=require('../controller/jobApplicationController')
const { verfiyAdmin } = require('../AdminRoutes/roleMiddleware')

router.post('/apply', authmiddleware,upload.single('resume'),applyJob);
router.get('/allapplication', authmiddleware,verfiyAdmin, getAllApplication )
router.get('/my', authmiddleware, getMyApplications)
router.get('/my/:id', authmiddleware, getMyApplicationsById)

module.exports=router;
