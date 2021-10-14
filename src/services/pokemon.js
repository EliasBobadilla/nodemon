const SqliteLibrary = require('../libraries/sqlite.library')
const { config } = require('../config')
const { toDto, toModel } = require('../utils/object.util')
const boom = require('@hapi/boom')

const TABLE = 'Pokemon'

class PokemonService {
  constructor () {
    this.db = new SqliteLibrary(config.database)
  }

  /**
   * method to get all pokemons
   * @returns {Promise<object[]>}
   */
  async all () {
    const query = `SELECT * FROM ${TABLE}`
    const result = await this.db.where(query)
    return result.map(item => toDto(item))
  }

  /**
   * method to get a list of pokemons by name
   * @param {string} name
   * @returns {Promise<object[]>}
   */
  async getByName (name) {
    const query = `SELECT * FROM ${TABLE} WHERE name LIKE ?`
    const result = await this.db.where(query, [`%${name}%`])
    return result.map(item => toDto(item))
  }

  /**
   * method to add or update a pokemon
   * @param {object} payload
   * @returns {Promise<boolean>}
   */
  async upsert (payload) {
    if (payload.id) return this.update(payload)
    return this.add(payload)
  }

  /**
   * method to delete a pokemon
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  async delete (id) {
    const query = `DELETE FROM ${TABLE} WHERE id = ?`
    return this.db.run(query, [id])
  }

  /**
   * method to get all pokemons but paged
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<object[]>}
   */
  async paged (page, limit) {
    const query = `SELECT * FROM ${TABLE} LIMIT ${limit} OFFSET ${(page - 1) * limit}`
    const result = await this.db.where(query)
    return result.map(item => toDto(item))
  }

  /**
   * method to add a pokemon
   * @param {object} payload
   * @returns {Promise<boolean>}
   */
  async add (payload) {
    await this.validateIfExist(payload.name)
    const { cols, values } = toModel(payload)
    const query = `INSERT INTO ${TABLE} (${cols.map(col => col).join(',')}) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
    return this.db.run(query, values)
  }

  /**
   * method to update a pokemon
   * @param {object} payload
   * @returns {Promise<boolean>}
   */
  async update (payload) {
    const { cols, values } = toModel(payload)
    const query = `UPDATE ${TABLE} SET ${cols.map(col => `${col} = ?`).join(',')} WHERE id = ?`
    return this.db.run(query, [...values, payload.id])
  }

  /**
   * method to validate by name if a pokemon exists
   * @param {string} name
   * @returns {Promise<void>}
   */
  async validateIfExist (name) {
    const query = `SELECT * FROM ${TABLE} WHERE name = ?`
    const result = await this.db.where(query, [name])
    if (result.length) throw boom.badData('This pokemon is already registered')
  }
}

module.exports = PokemonService
