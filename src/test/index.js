/* eslint-disable no-undef */

const superTest = require('supertest')
const chai = require('chai')
const server = require('../index')
const { expect } = chai

const localhost = superTest(server)

describe('Search pokemon by name', () => {
  const pokemon = 'Metapod'
  it('Is a Metapod?', async () => {
    const response = await localhost
      .get(`/v1/?name=${pokemon}`)

    expect(response.status).to.equal(200)
    expect(response.body).to.be.an('array')
    expect(response.body).to.have.lengthOf(1)
    expect(response.body[0]).to.have.property('name', pokemon)
  })
})

describe('Add new Pokemon', () => {
  const pokemon = {
    number: 1000,
    name: 'Mega PetalMD',
    type1: 'Developer',
    total: 1000,
    hp: 1000,
    attack: 1000,
    defense: 1000,
    spAtk: 1000,
    spDef: 1000,
    speed: 1000,
    generation: 1,
    legendary: true
  }
  it('was Mega PetalMD registered?', async () => {
    const response = await localhost
      .post('/v1/upsert')
      .send(pokemon)

    expect(response.status).to.equal(200)
    // eslint-disable-next-line no-unused-expressions
    expect(response.body).to.be.true
  })
})

describe('Delete a Pokemon', () => {
  const pokemon = 'PetalMD'
  it('Was pokemon deleted?', async () => {
    const { body } = await localhost
      .get(`/v1/?name=${pokemon}`)

    const response = await localhost
      .delete(`/v1/?id=${body[0].id}`)

    expect(response.status).to.equal(200)
    // eslint-disable-next-line no-unused-expressions
    expect(response.body).to.be.true
  })
})

server.close()
