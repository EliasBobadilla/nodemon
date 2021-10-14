const boom = require('@hapi/boom')

/**
 * Handler to validate the schema of a request
 * @param {object} schema
 * @param {string} check
 */
function validationHandler (schema, check = 'body') {
  return function (req, res, next) {
    const { error } = schema.validate(req[check], { errors: { stack: true } })
    error ? next(boom.badRequest(error)) : next()
  }
}

module.exports = validationHandler
