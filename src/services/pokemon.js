const SqliteLibrary = require('../libraries/sqlite.library')
const { config } = require('../config')
const { toDto, toModel, toUpdateModel } = require('../utils/object.util')
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

  async upsert (payload) {
    if (payload.id) return this.update(payload)
    return this.add(payload)
  }

  async delete (id) {
    const query = `DELETE FROM ${TABLE} WHERE id = ?`
    return this.db.run(query, [id])
  }

  async paged (page, limit) {
    const query = `SELECT * FROM ${TABLE} LIMIT ${limit} OFFSET ${(page - 1) * limit}`
    const result = await this.db.where(query)
    return result.map(item => toDto(item))
  }

  async add (payload) {
    await this.validateIfExist(payload.name)
    const { cols, values } = toModel(payload)
    const query = `INSERT INTO ${TABLE} (${cols.map(col => col).join(',')}) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
    return this.db.run(query, values)
  }

  async update (payload) {
    const { cols, values } = toUpdateModel(payload)
    const query = `UPDATE ${TABLE} SET ${cols.map(col => `${col} = ?`).join(',')} WHERE id = ?`
    return this.db.run(query, [...values, payload.id])
  }

  async validateIfExist (name) {
    const query = `SELECT * FROM ${TABLE} WHERE name = ?`
    const result = await this.db.where(query, [name])
    if (result.length) throw boom.badData('This pokemon is already registered')
  }
}

module.exports = PokemonService
