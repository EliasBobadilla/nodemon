const joi = require('joi')

const upsertSchema = joi.object({
  id: joi.number().positive().greater(0),
  number: joi.number().required().messages({ 'any.required': 'number is required' }),
  name: joi.string().min(2).required().messages({ 'any.required': 'name is required' }),
  type1: joi.string().min(2).required().messages({ 'any.required': 'type1 is required' }),
  type2: joi.string(),
  total: joi.number().positive().greater(0).required().messages({ 'any.required': 'total is required' }),
  hp: joi.number().positive().greater(0).required().messages({ 'any.required': 'hp is required' }),
  attack: joi.number().positive().greater(0).required().messages({ 'any.required': 'attack is required' }),
  defense: joi.number().positive().greater(0).required().messages({ 'any.required': 'defense is required' }),
  spAtk: joi.number().positive().greater(0).required().messages({ 'any.required': 'spAtk is required' }),
  spDef: joi.number().positive().greater(0).required().messages({ 'any.required': 'spDef is required' }),
  speed: joi.number().positive().greater(0).required().messages({ 'any.required': 'speed is required' }),
  generation: joi.number().positive().greater(0).required().messages({ 'any.required': 'generation is required' }),
  legendary: joi.bool().required().messages({ 'any.required': 'legendary is required' })
})

const deleteSchema = joi.object({
  id: joi.number().positive().greater(0).required().messages({
    'any.required': 'id is required'
  })
})

const pagedSchema = joi.object({
  page: joi.number().positive().greater(0).required().messages({
    'any.required': 'page is required'
  }),
  limit: joi.number().positive().greater(0).required().messages({
    'any.required': 'limit is required'
  })
})

module.exports = { upsertSchema, deleteSchema, pagedSchema }
