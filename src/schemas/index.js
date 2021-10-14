const joi = require('joi')

const getBySchema = joi.object({
  value: joi.alternatives(
    joi.string(),
    joi.number()).required().messages({
    'any.required': 'value is required'
  })
})

const createSchema = joi.object({
  number: joi.number().required().messages({ 'any.required': 'number is required' }),
  name: joi.string().required().messages({ 'any.required': 'name is required' }),
  type1: joi.string().required().messages({ 'any.required': 'type1 is required' }),
  type2: joi.string(),
  total: joi.number().required().messages({ 'any.required': 'total is required' }),
  hp: joi.number().required().messages({ 'any.required': 'hp is required' }),
  attack: joi.number().required().messages({ 'any.required': 'attack is required' }),
  defense: joi.number().required().messages({ 'any.required': 'defense is required' }),
  spAtk: joi.number().required().messages({ 'any.required': 'spAtk is required' }),
  spDef: joi.number().required().messages({ 'any.required': 'spDef is required' }),
  speed: joi.number().required().messages({ 'any.required': 'speed is required' }),
  generation: joi.number().required().messages({ 'any.required': 'generation is required' }),
  legendary: joi.bool().required().messages({ 'any.required': 'legendary is required' })

})

module.exports = { getBySchema, createSchema }
