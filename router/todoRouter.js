const express = require("express");
const verifyToken = require("../middlewares/tokenVerify");
const { createTodo, getAllTodo, updateTodo, deleteTodo, getEachTodo } = require("../controller/todoController");
const router = express.Router();

router.post("/addTodo", verifyToken, createTodo);
router.get("/getTodo", verifyToken, getAllTodo);
router.get("/getEach/:id", verifyToken, getEachTodo);
router.put("/updateTodo/:id", verifyToken, updateTodo);
router.delete("/deleteTodo/:id", verifyToken, deleteTodo);

module.exports = router;
