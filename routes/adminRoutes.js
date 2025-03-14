const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getDonarListController, getHospitalListController, getOrgListController, deleteDonarController } = require('../controllers/adminController')
const adminMiddleware = require('../middlewares/adminMiddleware')

// router object
const router = express.Router()

// Routes

// Get donar list
router.get('/donar-list', authMiddleware, adminMiddleware, getDonarListController)

// Get hospital list
router.get('/hospital-list', authMiddleware, adminMiddleware, getHospitalListController)

// Get organisation list
router.get('/organisation-list', authMiddleware, adminMiddleware, getOrgListController)

// ========================================================================================

// Delete donar || GET
router.delete('/delete-donar/:id', authMiddleware, adminMiddleware, deleteDonarController)

//Exports
module.exports = router;