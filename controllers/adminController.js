const userModel = require("../models/userModel");

// get donar list
const getDonarListController = async (req, res) => {
    try {
        const donarData = await userModel.find({role:'donar'}).sort({createdAt: -1})
        return res.status(200).send({
            success: true,
            totalCount: donarData.length,
            message: "Donar List Fetched Successfully",
            donarData,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in donar list API",
            error
        })
    }
};


// get hospital list
const getHospitalListController = async (req, res) => {
    try {
        const hospitalData = await userModel.find({role:'hospital'}).sort({createdAt: -1})
        return res.status(200).send({
            success: true,
            totalCount: hospitalData.length,
            message: "Hospital List Fetched Successfully",
            hospitalData,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Hospital list API",
            error
        })
    }
};


// get org list
const getOrgListController = async (req, res) => {
    try {
        const orgData = await userModel.find({role:'organisation'}).sort({createdAt: -1})
        return res.status(200).send({
            success: true,
            totalCount: orgData.length,
            message: "Organisation List Fetched Successfully",
            orgData,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Organisation list API",
            error
        })
    }
};


//delete record
const deleteDonarController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Record deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while deleting record"
        })
    }
};



// EXPORT
module.exports = {getDonarListController, getHospitalListController, getOrgListController, deleteDonarController}