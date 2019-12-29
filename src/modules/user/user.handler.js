'use strict'

const axios = require('axios')

module.exports = {
  getUsers, userDetails, userRepos
}

async function getUsers (request, reply) {
  try {
    const { since, page, per_page } = request.query // eslint-disable-line 

    const url = `${process.env.GITHUB_API_URL}/users`

    const response = await axios.get(url, { params: { since, page, per_page } })

    const result = { page, per_page, since, itens: response.data }

    return result
  } catch (error) {
    return reply.badImplementationCustom(error)
  }
}

async function userDetails (request, reply) {
  try {
    const { username } = request.params

    const url = `${process.env.GITHUB_API_URL}/users/${username}`

    const response = await axios.get(url)

    return response.data
  } catch (error) {
    if (error.response.status === 404) {
      return reply.notFound('User not found.')
    }
    return reply.badImplementationCustom(error)
  }
}

async function userRepos (request, reply) {
  try {
    const { username } = request.params
    const { query } = request

    const url = `${process.env.GITHUB_API_URL}/users/${username}/repos`

    const response = await axios.get(url, { ...query })

    const result = { ...query, repositories: response.data }

    return result
  } catch (error) {
    return reply.badImplementationCustom(error)
  }
}
