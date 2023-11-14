const TodoModel = require("../model/todoModel");

const createTodo = async (req, res) => {
    try {
        const userData = req.userData;
        if (userData.length !== 0) {
            const { title, description } = req.body;
            const newTodo = new TodoModel({
                title: title,
                description: description,
                createBy: userData._id,
            });
            await newTodo.save();
            res.send({ status: 201, msg: "todo successfully created", data: newTodo });
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
};

const getAllTodo = async (req, res) => {
    try {
        const userData = req.userData;
        if (userData.length !== 0) {
            const allTodo = await TodoModel.find({ createBy: userData._id });
            res.send({
                status: 201, data: allTodo
            })
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
};

const getEachTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await TodoModel.findById({ _id: todoId });
        if (todo) {
            res.send({
                status: 200, data: todo,
            })
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

const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const { title, description, status } = req.body;
        const updatedTodo = await TodoModel.findOneAndUpdate({ _id: todoId }, {
            title: title,
            description: description,
            status: status,
        });
        res.send({
            status: 200, msg: "todo data updated successful", data: await TodoModel.findById(todoId)
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const deletedTodo = await TodoModel.findOneAndDelete({ _id: todoId });
        res.send({ status: 200, msg: "todo deleted successful" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createTodo, getAllTodo, getEachTodo, updateTodo, deleteTodo };