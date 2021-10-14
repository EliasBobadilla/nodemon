const { Router } = require('express')
const validationHandler = require('../../handlers/validationHandler')
const PokemonService = require('../../services/pokemon')
const { upsertSchema, deleteSchema } = require('../../schemas')

const pokemonService = new PokemonService()
const router = Router()

router.get(
  '/',
  async (req, res, next) => {
    try {
      const { name } = req.query
      const response = name ? await pokemonService.getByName(name) : await pokemonService.all()
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  })

router.post(
  '/upsert',
  validationHandler(upsertSchema),
  async (req, res, next) => {
    try {
      const { body } = req
      const response = await pokemonService.upsert(body)
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  })

router.delete(
  '/',
  validationHandler(deleteSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.query
      const response = await pokemonService.delete(id)
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
