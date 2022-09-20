const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err)

  if (err.valueType) {
    return res
      .status(500)
      .json({ msg: 'Something went wrong, please try again later.' })
  } else {
    return res.status(404).json({ msg: err.message })
  }

  // return res.json(err.valueType)
}

module.exports = errorHandlerMiddleware
