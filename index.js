const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.DEV_PORT || 5000;
const userRoute = require("./router/userRouter");
const todoRoute = require("./router/todoRouter");
const dbConnection = require("./helper/dbConnect");
const cookieParser = require("cookie-parser");

// Whitelisted origins for CORS (replace with your allowed origins)
const allowedOrigins = ['https://benevolent-bonbon-a47d48.netlify.app/'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            return callback(new Error('Origin not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to userAuth server with todo app");
})
// user router
app.use("/user", userRoute);
// todo router
app.use("/todo", todoRoute);

app.listen(port, async () => {
    console.log(`Listening to the port at: http://localhost:${port}`);
    await dbConnection();
})