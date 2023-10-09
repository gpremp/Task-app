const jwt = require("jsonwebtoken");
const { Task } = require("../../models/task");
const { JWTPRIVATEKEY } = require("../../config/config");

const createTask = async (req, res) => {
  jwt.verify(req.token, JWTPRIVATEKEY, async (err, authData) => {
    if (err) {
      res.send({
        message: "Token is not valid",
      });
    } else {
      try {
        await new Task({ ...req.body }).save();
        res.send({ message: "Task Saved successfully" });
      } catch (err) {
        res.send({ message: "Internal Server Error", error: err });
      }
    }
  });
};

const updateTask = async (req, res) => {
  jwt.verify(req.token, JWTPRIVATEKEY, async (err, authData) => {
    if (err) {
      res.send({
        message: "Token is not valid",
      });
    } else {
      try {
        const id = req.params.id;
        await Task.findByIdAndUpdate({ _id: id }, { ...req.body });
        res.send({ message: "Person update successfully" });
      } catch (error) {
        res.send({ message: "Internal Server Error" });
      }
    }
  });
};

const deleteTask = async (req, res) => {
  jwt.verify(req.token, JWTPRIVATEKEY, async (err, authData) => {
    if (err) {
      res.send({
        message: "Token is not valid",
      });
    } else {
      try {
        const id = req.params.id;
        let task = await Task.findByIdAndDelete(id);
        res.json(task);
      } catch (error) {
        res.send({ message: "Internal Server Error" });
      }
    }
  });
};

const getTask = async (req, res) => {
  jwt.verify(req.token, JWTPRIVATEKEY, async (err, authData) => {
    if (err) {
      res.send({
        message: "Token is not valid",
      });
    } else {
      try {
        const id = req.params.id;
        let task = await Task.findById(id);
        res.json(task);
      } catch (error) {
        res.send({ message: "Internal Server Error" });
      }
    }
  });
};

const getAllTask = async (req, res) => {
  try {
    const Tasks = await Task.find();
    res.json(Tasks);
  } catch (error) {
    res.send({ message: "Internal Server Error" });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getAllTask,
  getAllTask,
};
