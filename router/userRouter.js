const express = require("express");
const router = express.Router();

const { userRegister, getAllUser, updateUser, loginUser, getUserData, sendEmailForResetPass, resetPassword } = require("../controller/userController");
const { registerVerify, loginVerify } = require("../middlewares/userVerify");
const verifyToken = require("../middlewares/tokenVerify");
const sendEmail = require("../middlewares/sendEmail");

// for admin route
router.get("/allUser", getAllUser);

// for user route
router.post("/register", registerVerify, userRegister);
router.post("/login", loginVerify, loginUser);
router.get("/getUser", verifyToken, getUserData);
router.put("/updateUser", verifyToken, updateUser);
router.post("/resetPass", sendEmailForResetPass, sendEmail);
router.put("/reset/resetPass", resetPassword);


module.exports = router;