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

const allowedOrigins = ["https://benevolent-bonbon-a47d48.netlify.app/", "http://localhost:5173"];
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", allowedOrigins);
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials: true")
//     next();
// });

// Whitelisted origins for CORS (replace with your allowed origins)


// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) !== -1) {
//             return callback(null, true);
//         } else {
//             return callback(new Error('Origin not allowed by CORS'));
//         }
//     },
//     credentials: true
// }));
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

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