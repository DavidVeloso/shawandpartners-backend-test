'use strict'

const Handler = require('./user.handler')
const Schema = require('./user.schema')

module.exports = [
  {
    method: 'GET',
    path: '/users',
    config: {
      description: 'Return a list of GitHub users and the link for the next page.',
      tags: ['api', 'users'],
      handler: Handler.getUsers,
      validate: {
        query: Schema.queryUsers
      }
    }
  },
  {
    method: 'GET',
    path: '/users/{username}/details',
    config: {
      description: 'Return the details of a GitHub user',
      tags: ['api', 'users'],
      handler: Handler.userDetails,
      validate: {
        params: Schema.params
      }
    }
  },
  {
    method: 'GET',
    path: '/users/{username}/repos',
    config: {
      description: 'Return a list with all user repositories',
      tags: ['api', 'users'],
      handler: Handler.userRepos,
      validate: {
        params: Schema.params,
        query: Schema.queryRepos
      }
    }
  }
]
