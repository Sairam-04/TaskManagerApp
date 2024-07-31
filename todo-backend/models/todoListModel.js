const mongoose = require("mongoose");

const status = ["todo", "inprogress", "done"]

const toDoList = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    todolist:[
        {
            title:{
                type: String,
                required: [true],
                maxLength: [50, "Title must be 50 characters"]
            },
            desc:{
                type: String,
                default:""
            },
            status:{
                type: String,
                required: true,
                enum: status
            },
            createdAt:{
                type: Date,
                default: Date.now
            },
            tags:[]
        }
    ]
})

module.exports = mongoose.model("ToDoList",toDoList);
