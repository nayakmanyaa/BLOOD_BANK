const mongoose = require('mongoose');
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// create inventory
const createInventoryController = async(req, res) => {
    try {
        const {email} = req.body
        // validation 
        const user = await userModel.findOne({email})
        if(!user) {
            throw new Error('User Not Found')
        }
        // if(inventoryType === 'in' && user.role !== 'donar') {
        //     throw new Error('Not a donar account')
        // }
        // if(inventoryType === 'out' && user.role !== 'hospital') {
        //     throw new Error('Not a hospital')
        // }

        if(req.body.inventoryType == 'out') {
            const requestedBloodGroup = req.body.bloodGroup
            const requestedQuantityOfBlood = req.body.quantity
            const organisation = new mongoose.Types.ObjectId(req.body.userId)
            // calculating blood quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {$match: {
                    organisation,
                    inventoryType: 'in',
                    bloodGroup: requestedBloodGroup,
                }}, {
                    $group: {
                        _id: "$bloodGroup",
                        total:{$sum: '$quantity'}
                    }
                }
            ])
            // console.log("Total In", totalInOfRequestedBlood)
            const totalIn = totalInOfRequestedBlood[0]?.total || 0
            // calculate OUT blodd quantity
            const totalInOfRequestedBloodGroup = await inventoryModel.aggregate([
                {$match: {
                    organisation,
                    inventoryType: 'out',
                    bloodGroup: requestedBloodGroup,
                }}, {
                    $group: {
                        _id: "$bloodGroup",
                        total: {$sum: "$quantity"}
                    }
                }
            ])
            const totalOut = totalInOfRequestedBloodGroup[0]?.total || 0

            // in & out calc
            const availableQuantityOfBloodGroup = totalIn - totalOut

            // quantity validation
            if(availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`
                })
            }
            req.body.hospital = user?._id;
        } else {
            req.body.donar = user?._id;
        }

        // save record
        const inventory = new inventoryModel(req.body)
        await inventory.save()
        return res.status(201).send({
            success: true,
            message: "New blood record added"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in creating inventory API",
            error
        })
    }
};


// get all blood record
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({organisation: req.body.userId}).populate('donar').populate('hospital').sort({createdAt: -1});
        return res.status(200).send({
            success: true,
            message: "get all records successfully",
            inventory,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in get all inventory",
            error
        })
    }
}


// get hospital blood record
const getInventoryForHospitalController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find(req.body.filters).populate('donar').populate('hospital').populate("organisation").sort({createdAt: -1});
        return res.status(200).send({
            success: true,
            message: "get hospital consumer records successfully",
            inventory,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in get consumer inventory",
            error
        })
    }
}


// get blood record of 3
const getRecentInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({
            organisation: req.body.userId
        }).limit(3).sort({createdAt: -1})
        return res.status(200).send({
            success: true,
            message: "Recent Inventory Data",
            inventory,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in recent Inventory API",
            error,
        })
    }
}


// get donar record
const getDonarsController = async (req, res) => {
    try {
        const organisation = req.body.userId
        // find donars
        const donarId = await inventoryModel.distinct("donar", {
            organisation
        })
        // console.log(donarId)
        const donars = await userModel.find({_id: {$in: donarId}})

        return res.status(200).send({
            success: true,
            message: "Donar record fetched successfully",
            donars,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Donar records",
            error
        })
    }
};


// get hostipal records
const getHospitalController = async (req, res) => {
    try {
        const organisation = req.body.userId
        // get hospital id
        const hospitalId = await inventoryModel.distinct('hospital', {organisation})
        // find hospital
        const hospitals = await userModel.find({
            _id: {$in: hospitalId}
        })
        return res.status(200).send({
            success: true,
            message: "hospital data fetched successfully",
            hospitals,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in get Hospital API",
            error
        })
    }
}


// get organisation records
const getOrganisationController = async (req, res) => {
    try {
        const donar = req.body.userId
        const orgId = await inventoryModel.distinct('organisation', {donar})
        // find org
        const organisations = await userModel.find({
            _id: { $in: orgId },
        });
        return res.status(200).send({
            success: true,
            message: "Organisation Data Fetched Successfully",
            organisations
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in ORG API",
            error
        })
    }
}


// get organisation for hospital
const getOrganisationForHospitalController = async (req, res) => {
    try {
        const hospital = req.body.userId
        const orgId = await inventoryModel.distinct('organisation', {hospital})
        // find org
        const organisations = await userModel.find({
            _id: { $in: orgId },
        });
        return res.status(200).send({
            success: true,
            message: "Hospital Organisation Data Fetched Successfully",
            organisations
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Hospital ORG API",
            error
        })
    }
}


module.exports = { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryForHospitalController, getRecentInventoryController }