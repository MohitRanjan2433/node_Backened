const express = require('express');
const router = express.Router();

//iMPORT CONTROLLER
const { dummyLink } = require("../controller/likecontroller");
const { createComment } = require("../controller/commentcontroller");

//mAPPING CREATE
router.get("/dummyroute", dummyLink);
router.get("/comments/create", createComment);  

//EXPORT
module.exports = router;