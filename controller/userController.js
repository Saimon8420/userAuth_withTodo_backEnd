const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const saltRound = 10;
const jwt = require('jsonwebtoken');
const { configDotenv } = require("dotenv");

// for admin part
const getAllUser = async (req, res, next) => {
    try {
        const allUsers = await userModel.find({}).select("-password");
        res.send(allUsers);
    } catch (error) {
        console.log(error);
    }
}

// for user
const userRegister = async (req, res) => {
    const { firstName, lastName, address, phone, email, password } = req.body;

    const existEmail = await userModel.findOne({ email: email });
    if (existEmail) {
        return res.send({ status: 500, msg: "email already registered, try with another one" });
    }

    const existPhone = await userModel.findOne({ phone: phone });
    if (existPhone) {
        return res.send({ status: 500, msg: "phone number already registered, try with another one" });
    }
    const hashedPass = await bcrypt.hash(password, saltRound);
    try {
        const newUser = new userModel({
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
            email: email,
            password: hashedPass,
        });
        await newUser.save();
        console.log(newUser);
        res.send({ status: 201, msg: "user successfully created" });
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await userModel.findOne({ email: email });
        const matched = await bcrypt.compare(password, findUser.password);
        if (matched) {
            const token = jwt.sign({
                data: findUser._id,
            }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.send({ status: 200, msg: "user login successful", accessToken: token, userData: findUser });
        }
        else {
            console.log("password does not matched");
            res.send({ status: 500, msg: "password does not matched" });
        }

    } catch (error) {
        console.log(error);
    }
}

const getUserData = async (req, res) => {
    try {
        const userData = req.userData;
        const accessToken = req.accessToken;
        if (userData) {
            if (userData?._id) {
                res.send({ status: 201, data: userData, token: accessToken, expireTime: req.expireStamp });
            }
            else {
                res.send({
                    status: 401,
                    data: userData,
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
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const userData = req.userData;
        if (userData.length !== 0) {
            const { firstName, lastName, phone, address, unChangePass, changedPass } = req.body;
            if (changedPass && changedPass?.length > 0) {
                const hashedPass = await bcrypt.hash(changedPass, saltRound);
                const updatedUser = await userModel.findOneAndUpdate(userData._id, { firstName: firstName, lastName: lastName, phone: phone, address: address, password: hashedPass });
                await updatedUser.save();
                res.send({ status: 200, msg: "user updated successfully", userData: await userModel.findById(userData._id) });
            }
            else {
                const updatedUser = await userModel.findOneAndUpdate(userData._id, { firstName: firstName, lastName: lastName, phone: phone, address: address, password: unChangePass });
                await updatedUser.save();
                res.send({ status: 200, msg: "user updated successfully", userData: await userModel.findById(userData._id) });
            }
        } else {
            res.send({
                status: 401,
                msg: "Unauthorized",
            });
        }
    } catch (error) {
        console.log(error);
    }
}

// if/when forget password
// sending mail to user for reset password
const sendEmailForResetPass = async (req, res, next) => {
    try {
        const { email } = req.body;
        const findUser = await userModel.findOne({ email: email });
        if (findUser) {
            req.emailAdd = email;
            return next();
        }
        else if (!findUser) {
            res.send({
                status: 401,
                msg: "User not found with this email, please register",
            })
        };
    } catch (error) {
        console.log(error);
    }
}

// finally resetting password
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        if (token) {
            const decodedEmail = jwt.verify(token, process.env.JWT_SECRET_FORGET_PASS);
            console.log(decodedEmail);
            const findUser = await userModel.findOne({ email: decodedEmail?.data });
            if (findUser) {
                const hashedPass = await bcrypt.hash(password, saltRound);
                const filter = { email: findUser?.email };
                const updatePass = await userModel.findOneAndUpdate(filter, { password: hashedPass });
                await updatePass.save();
                res.send({ status: 200, msg: "password updated successfully,now you can login" });
            }
            else {
                res.send({ status: 401, msg: "User not found" });
            }
        }
        else {
            res.send({ status: 401, msg: "User not found" });
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.send({
                status: 401,
                msg: "Unauthorized",
            });
        } else {
            // Handle other errors
            console.log(error);
            throw error;
        }
    }
}

module.exports = { getAllUser, userRegister, loginUser, getUserData, updateUser, sendEmailForResetPass, resetPassword };