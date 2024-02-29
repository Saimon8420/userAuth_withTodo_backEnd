const jwt = require('jsonwebtoken');
const { configDotenv } = require("dotenv");
const userModel = require('../model/userModel');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader === undefined || authHeader.includes("undefined")) {
        res.send({
            status: 401,
            msg: "Unauthorized",
        });
    }
    else {
        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const currentTime = new Date().getTime() / 1000;
            if (decoded?.exp > currentTime) {
                const findUser = await userModel.findOne({ _id: decoded?.data }).select("-password");
                req.userData = findUser;
                req.accessToken = token;
                req.expireStamp = decoded?.exp;
                next();
            }
            else {
                req.userData = {
                    status: 401,
                    msg: "Unauthorized",
                }
                next();
            }
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                req.userData = {
                    status: 401,
                    msg: "Unauthorized",
                };
                next();
            } else {
                // Handle other errors
                console.log(error);
                throw error;
            }
        }
    }
}
module.exports = verifyToken;