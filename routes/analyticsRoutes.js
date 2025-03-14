const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const { bloodGroupDetailsController } = require("../controllers/anaylticsController")


const router = express.Router()

// routes

//get blood data
router.get('/bloodGroups-data', authMiddleware, bloodGroupDetailsController)

module.exports = router