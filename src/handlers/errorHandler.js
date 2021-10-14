const { config } = require('../config')
const boom = require('@hapi/boom')
const logger = require('log4js').getLogger('default')

/**
 * Handler for remove error stack on production mode
 * @param {object} error
 * @param {object} stack
 */
function errorStack (error, stack) {
  return config.dev ? { ...error, stack } : error
}

/**
 * Handler for print in console errors
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function logErrors (err, req, res, next) {
  logger.error(err)
  next(err)
}

/**
 * Handler for return all errors as Boom
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function wrapErrors (err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err))
  }
  next(err)
}

/**
 * Error handler for all request
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function errorHandler (err, req, res, next) {
  const { output: { statusCode, payload } } = err
  res.status(statusCode)
  res.json(errorStack(payload, err.stack))
}

module.exports = {
  logErrors,
  errorHandler,
  wrapErrors
}
