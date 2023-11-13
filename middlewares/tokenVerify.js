const jwt = require('jsonwebtoken');
const { configDotenv } = require("dotenv");
const userModel = require('../model/userModel');

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || authHeader.includes("undefined")) {
            res.send({
                status: 401,
                msg: "Unauthorized",
            });
        } else {
            const token = authHeader.split(' ')[1];
            const decodedId = jwt.verify(token, process.env.JWT_SECRET);
            const findUser = await userModel.findOne({ _id: decodedId.data });
            req.userData = findUser;
            next();
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = verifyToken;