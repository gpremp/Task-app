const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Task } = require("../../models/task");
const {JWTPRIVATEKEY} = require("../../config/config");
const { createTask, updateTask, deleteTask, getTask, getAllTask } = require("./task.contoller");

router.get("/",getAllTask)

router.get("/:id",verifyToken,getTask)

router.delete("/:id",verifyToken,deleteTask)

router.put("/:id",verifyToken,updateTask)

router.post("/",verifyToken,createTask);

function verifyToken(req,res,next){
	const bearerHeader = req.headers['authorization'];
	if(typeof bearerHeader!== 'undefined'){
		const bearer = bearerHeader.split(" ");
		const token = bearer[1];
		req.token = token;
		next();
	}
	else{
		res.send({
			message : 'Token is not valid' 
		})
	}
}

module.exports = router;