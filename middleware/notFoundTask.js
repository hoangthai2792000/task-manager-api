const notFoundTask = (task, id) => {
  if (!task) throw Error(`No task with the id: ${id}`)
}

module.exports = notFoundTask
