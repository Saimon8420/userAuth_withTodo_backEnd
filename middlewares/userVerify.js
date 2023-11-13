const userModel = require("../model/userModel");

const loginVerify = async (req, res, next) => {
    try {
        const userEmail = req.body.email;
        const exist = await userModel.find({ email: userEmail });
        if (exist.length !== 0) {
            next();
        }
        else {
            res.send({ status: 500, msg: "No user found with this email/password" });
        }
    } catch (error) {
        console.log(error);
    }
}

const registerVerify = async (req, res, next) => {
    try {
        const userEmail = req.body.email;
        const exist = await userModel.find({ email: userEmail });
        if (exist.length !== 0) {
            res.send({ status: 500, msg: "user already exist,please login" });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { loginVerify, registerVerify };