const boom = require('@hapi/boom')

/**
 * Wrong url requests handler
 * @param {object} req
 * @param {object} res
 */
function notFoundHandler (req, res) {
  const { output: { statusCode, payload } } = boom.notFound()
  res.status(statusCode).json(payload)
}

module.exports = notFoundHandler
