/* global describe, it, expect, server */

const BASE_USERS_ENDPOINT = '/api/users'

describe('#User', () => {
  describe(`GET ${BASE_USERS_ENDPOINT}`, () => {
    it('should get a list of github users', async () => {
      const response = await server.inject({
        method: 'GET',
        url: BASE_USERS_ENDPOINT
      })
      const { result, statusCode } = response
      expect(statusCode).to.equals(200)
      expect(result).to.exist()
      expect(result.page).to.exist()
      expect(result.per_page).to.exist()
      expect(result.itens.length).to.be.above(1)
    })

    it('should filter by since (id)', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `${BASE_USERS_ENDPOINT}?since=20000`
      })
      const { result, statusCode } = response
      expect(statusCode).to.equals(200)
      expect(result).to.exist()
      expect(result.page).to.exist()
      expect(result.per_page).to.exist()
      expect(result.since).to.exist()
      expect(result.since).to.equals(20000)
      expect(result.itens.length).to.be.above(1)
      expect(result.itens[0].id).to.be.above(20000)
    })

    it('users using pagination (page and per_page)', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `${BASE_USERS_ENDPOINT}?page=3&per_page=5`
      })
      const { result, statusCode } = response
      expect(statusCode).to.equals(200)
      expect(result).to.exist()
      expect(result.page).to.exist()
      expect(result.page).to.equals(3)
      expect(result.per_page).to.exist()
      expect(result.per_page).to.equals(5)
      expect(result.itens.length).to.equal(5)
    })

    it('try use not allowed query, should return error', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `${BASE_USERS_ENDPOINT}?not_valid_query=somethingbad`
      })
      const { result, statusCode } = response
      expect(statusCode).to.equals(400)
      expect(result).to.exist()
      expect(result.error).to.exist()
      expect(result.message).to.exist()
      expect(result.message).to.equals('not_valid_query: "not_valid_query" is not allowed')
    })
  })

  describe(`GET ${BASE_USERS_ENDPOINT}/{username}/details`, () => {
    it('should get a github user info', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `${BASE_USERS_ENDPOINT}/DavidVeloso/details`
      })
      const { result, statusCode } = response
      expect(statusCode).to.equals(200)
      expect(result).to.exist()
      expect(result.id).to.exist()
      expect(result.name).to.exist()
      expect(result.login).to.exist()
      expect(result.login).to.equal('DavidVeloso')
    })

    it('try to get random username, should return not found info', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `${BASE_USERS_ENDPOINT}/NotFoundRandomUser/details`
      })
      const { result, statusCode } = response
      expect(statusCode).to.equals(404)
      expect(result.error).to.exist()
      expect(result.message).to.exist()
      expect(result.message).to.equals('User not found.')
    })
  })

  describe(`GET ${BASE_USERS_ENDPOINT}/{username}/repos`, () => {
    it('should get user\'s repos', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `${BASE_USERS_ENDPOINT}/DavidVeloso/repos`
      })
      const { result, statusCode } = response
      expect(statusCode).to.equals(200)
      expect(result).to.exist()
      expect(result.repositories).to.exist()
      expect(result.repositories.length).to.be.above(1)
    })

    it('use repos filters', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `${BASE_USERS_ENDPOINT}/DavidVeloso/repos?type=owner&sort=updated`
      })
      const { result, statusCode } = response
      expect(statusCode).to.equals(200)
      expect(result.repositories).to.exist()
      expect(result.type).to.equals('owner')
      expect(result.sort).to.equals('updated')
    })
  })
})
