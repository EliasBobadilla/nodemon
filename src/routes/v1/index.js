const { Router } = require('express')
const validationHandler = require('../../handlers/validationHandler')
const PokemonService = require('../../services/pokemon')
const { getBySchema, createSchema } = require('../../schemas')

const pokemonService = new PokemonService()
const router = Router()

router.get(
  '/list',
  async (req, res, next) => {
    try {
      const response = await pokemonService.all()
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  })

router.get(
  '/name',
  validationHandler(getBySchema, 'query'),
  async (req, res, next) => {
    try {
      const { value } = req.query
      const response = await pokemonService.getByName(value)
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  })

router.post(
  '/add',
  validationHandler(createSchema),
  async (req, res, next) => {
    try {
      const { body } = req
      const response = await pokemonService.add(body)
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
