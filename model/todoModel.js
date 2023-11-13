const { mongoose, Schema } = require("mongoose");

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [5],
        maxLength: [50],
    },
    description: {
        type: String,
        required: true,
        minLength: [10],
        maxLength: [150],
    },
    status: {
        type: String,
        default: "incomplete",
    },
    cratedOn: {
        type: Date,
        default: Date.now,
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }
})

const TodoModel = mongoose.model('Todos', todoSchema);
module.exports = TodoModel;