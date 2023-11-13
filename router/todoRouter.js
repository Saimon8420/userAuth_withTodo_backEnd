const express = require("express");
const verifyToken = require("../middlewares/tokenVerify");
const { createTodo, getAllTodo, updateTodo, deleteTodo } = require("../controller/todoController");
const router = express.Router();

router.post("/addTodo", verifyToken, createTodo);
router.get("/getTodo", verifyToken, getAllTodo);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
