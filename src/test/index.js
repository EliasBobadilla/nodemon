/* eslint-disable no-undef */

const superTest = require('supertest')
const chai = require('chai')
const expect = chai.expect

const localhostUrl = 'http://localhost:3000'
const localhost = superTest(localhostUrl)

describe('Search pokemon by name', () => {
  const pokemon = 'Metapod'
  it('Search pokemon by name', async () => {
    const response = await localhost
      .get(`/v1/?name=${pokemon}`)
      .then(response => {
        return response
      })
    expect(response.status).to.equal(200)
    expect(response.body).to.be.an('array')
    expect(response.body).to.have.lengthOf(1)
    expect(response.body[0], `Is ${pokemon}?`).to.have.property('name', pokemon)
  })
})

describe('Add Pokemon', () => {
  const pokemon = {
    number: 1000,
    name: 'Mega Metapod Test',
    type1: 'Bug',
    total: 1000,
    hp: 1000,
    attack: 1000,
    defense: 1000,
    spAtk: 1000,
    spDef: 1000,
    speed: 1000,
    generation: 1,
    legendary: false
  }
  it('Add Mega Metapod', async () => {
    const response = await localhost
      .post('/v1/upsert')
      .send(pokemon)
      .then(response => {
        return response
      })
    expect(response.status).to.equal(200)
    // eslint-disable-next-line no-unused-expressions
    expect(response.body, 'Pokemon was registered').to.be.true
  })
})

describe('Delete Pokemon', () => {
  const pokemon = 'Mega Metapod Test'
  it('Delete Mega Metapod', async () => {
    const { body } = await localhost
      .get(`/v1/?name=${pokemon}`)
      .then(response => {
        return response
      })

    const response = await localhost
      .delete(`/v1/?id=${body[0].id}`)
      .then(response => {
        return response
      })
    expect(response.status).to.equal(200)
    // eslint-disable-next-line no-unused-expressions
    expect(response.body, 'Pokemon was deleted').to.be.true
  })
})
