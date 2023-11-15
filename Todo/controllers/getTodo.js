//import the model
const { response } = require("express");
const Todo = require("../models/Todo");

//define router handler
exports.getTodo = async(req,res) => {
    try {
        //fetch all todo items from database
        const todos = await Todo.find({});

        //response
        res.status(200)
        .json({
            success:true,
            data:todos,
            message:"Entire Todo data is fetched",
        });
    }
    catch(err){
        console.erroe(err);
        res.status(500)
        .json({
            success:false,
            data:"Internal server error",
            message:err.message,
        })
    } 
}

exports.getTodoById = async(req,res) => {
    try {
        //extract todo item basis on Id 
        const id = req.params.id;
        const todo = await Todo.findById( {_id: id})

        //data for given id not found
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"No data found for given id",
            })
        }
        //data dor given id found
        res.status(200).json({
            success:true,
            data:todo,
            message:"Todo ${id} data successfully fetched",
        })
    }
    catch(err){
        console.erroe(err);
        res.status(500)
        .json({
            success:false,
            data:"Internal server error",
            message:err.message,
        })
    } 
}