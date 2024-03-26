const setCookies = require("../middlewares/setCookies");
const jwt = require('jsonwebtoken');
const { configDotenv } = require("dotenv");

const refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies?.userAuth;
        if (token !== undefined) {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            if (decoded?.data) {
                const newToken = await jwt.sign({
                    data: decoded?.data,
                }, process.env.JWT_SECRET, { expiresIn: "1hr" });
                setCookies(newToken, res);
                next();
            }
            else {
                res.send({
                    status: 401,
                    msg: "token expired!",
                });
            }
        }
        else {
            res.send({
                status: 401,
                msg: "Unauthorized",
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = refreshToken;