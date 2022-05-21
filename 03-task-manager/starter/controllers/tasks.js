const Task = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require('../errors/custom-error');

// retrieve all the task
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks: tasks }); // we can also write just {tasks} according to ES6 when both proeprty and variable value name are same
  // alternatives that can be used here
  // res.status(200).json({tasks, amount: tasks.length})
  // res.status(200).json({success:true, data:{tasks, nbHits:tasks.length}});
  // res.status(200).json({status:"success", data:{tasks, nbHits:tasks.length}});
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body); // constructing the document from the body
  res.status(201).json({ task }); // 201 status code means the post request is authorised
  res.status(500).json({ msg: error }); // 500 is the general server error
});

const getTask = asyncWrapper(async (req, res, next) => {
  // try {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // const error = new Error('Not Found');
    // error.status = 404;
    // return next(error);

    return next(createCustomError(`No task with id : ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }

  res.status(200).json({ task });
  // } catch (error) {
  //   res.status(500).json({ msg: error }); // this is the error we are getting from mongoose such as when the character length of id is different than expected
  // }
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }
  res.status(200).json({ task });
  // other altenatives we can write here
  // res.status(200).send();
  // res.status(200).json({ task: null, success: true });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
