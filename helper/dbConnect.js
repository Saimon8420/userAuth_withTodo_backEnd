const { configDotenv } = require("dotenv");
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
const dbConnection = async () => {
    try {
        await mongoose.connect(url);
        console.log("db connected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnection;