const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.DEV_PORT;
const userRoute = require("./router/userRouter");
const todoRoute = require("./router/todoRouter");
const dbConnection = require("./helper/dbConnect");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile("/view/index.html", { root: __dirname });
})
// user router
app.use("/user", userRoute);
// todo router
app.use("/todo", todoRoute);

app.listen(port, async () => {
    console.log(`Listening to the port at: http://localhost:${port}`);
    await dbConnection();
})