const express = require('express');
const router = express.Router();

//import cotroller
const {createTodo} = require("../controllers/createTodo");
const {getTodo,getTodoById} = require("../controllers/getTodo");
const {updateTodo} = require("../controllers/updateTodo");

//define API routes
router.post("/createTodo", createTodo);
router.get("/getTodos",getTodo);
router.get("/getTodos/:id",getTodoById);
router.get("/updateTodo/:id", updateTodo);

module.exports = router; 