const express = require("express")

const { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryForHospitalController, getRecentInventoryController } = require("../controllers/inventoryController")
const authMiddleware = require("../middlewares/authMiddleware")


const router = express.Router()

// routes
// add inventory || POST
router.post('/create-inventory', authMiddleware, createInventoryController)

//get all blood record
router.get('/get-inventory', authMiddleware, getInventoryController)

//get recent blood record
router.get('/get-recent-inventory', authMiddleware, getRecentInventoryController)

//get hospital blood record
router.post('/get-inventory-hospital', authMiddleware, getInventoryForHospitalController)

//get donar record
router.get('/get-donars', authMiddleware, getDonarsController)

//get hospital record
router.get('/get-hospitals', authMiddleware, getHospitalController)

//get organisation record
router.get('/get-organisation', authMiddleware, getOrganisationController)

//get organisation record
router.get('/get-organisation-for-hospital', authMiddleware, getOrganisationForHospitalController)

module.exports = router