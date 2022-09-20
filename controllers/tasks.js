const Task = require('../models/Task')
const notFoundTask = require('../middleware/notFoundTask')
require('express-async-errors')

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
}

const addNewTask = async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
}

const getSingleTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id })

  notFoundTask(task, req.params.id)

  res.status(200).json({ task })
}

const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
    // always give options object
  )

  notFoundTask(task, req.params.id)

  res.status(200).json({ task })
}

const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete({ _id: req.params.id })

  notFoundTask(task, req.params.id)

  res.status(200).send('Delete successfully')
}

module.exports = {
  getAllTasks,
  addNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
}
