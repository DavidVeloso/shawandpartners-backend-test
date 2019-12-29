'use strict'

const Joi = require('@hapi/joi')

const schema = {
  username: Joi.string().max(40)
}

// Ensure that only this fields will be received by querystring
const queryUsers = Joi.object({
  since: Joi.number().optional(),
  page: Joi.number().integer().default(0),
  per_page: Joi.number().integer().min(1).max(100).default(10)
})

const queryRepos = Joi.object({
  type: Joi.string().valid('all', 'owner', 'member'),
  sort: Joi.string().valid('created', 'updated', 'pushed', 'full_name'),
  direction: Joi.string().valid('asc', 'desc')
})

// Ensure that only this fields will be received by request params
const params = Joi.object({
  username: schema.username
})

module.exports = {
  queryUsers, queryRepos, params
}
