const jwt = require('jsonwebtoken');
const { configDotenv } = require("dotenv");
const userModel = require('../model/userModel');

const verifyToken = async (req, res, next) => {
    try {
        const token = req?.cookies?.userAuth;
        if (token !== undefined) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const findUser = await userModel.findOne({ _id: decoded?.data }).select("-password");
            req.userData = findUser;
            next();
        }
    } catch (error) {
        console.log(error);
    }

}
module.exports = verifyToken;