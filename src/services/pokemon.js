const SqliteLibrary = require('../libraries/sqlite.library')
const { config } = require('../config')
const { toDto, toModel } = require('../utils/object.util')
const boom = require('@hapi/boom')

const TABLE = 'Pokemon'

class PokemonService {
  constructor () {
    this.db = new SqliteLibrary(config.database)
  }

  async all () {
    const query = `SELECT * FROM ${TABLE}`
    const result = await this.db.where(query)
    return result.map(item => toDto(item))
  }

  async getByName (name) {
    const query = `SELECT * FROM ${TABLE} WHERE name LIKE ?`
    const result = await this.db.where(query, [`%${name}%`])
    return result.map(item => toDto(item))
  }

  async add (payload) {
    await this.validateIfExist(payload.name)
    const { cols, values } = toModel(payload)
    const query = `INSERT INTO ${TABLE} (${cols}) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
    return this.db.run(query, values)
  }

  async validateIfExist (name) {
    const query = `SELECT * FROM ${TABLE} WHERE name = ?`
    const result = await this.db.where(query, [name])
    if (result.length) throw boom.badData('This pokemon is already registered')
  }
}

module.exports = PokemonService
