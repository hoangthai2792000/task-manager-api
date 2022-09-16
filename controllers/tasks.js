const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const addNewTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id })

    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with the id: ${req.params.id}` })
    }

    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
      // always give options object
    )

    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with the id: ${req.params.id}` })
    }

    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({ _id: req.params.id })

    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with the id: ${req.params.id}` })
    }

    res.status(200).send('Delete successfully')
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllTasks,
  addNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
}
