'use strict'

const Server = require('./server')
const { registerPlugins } = require('./plugins')

module.exports = { start }

async function start () {
  const server = await Server.init()
  const { NODE_ENV } = process.env

  await registerPlugins(server)
  await loadRoutes(server)

  if (NODE_ENV === 'test') { return server }

  await server.start()

  server.log(['log'], `Server running at ${server.info.uri}`)
}

async function loadRoutes (server) {
  console.log('--> Load routes')
  await server.register({
    register: async (server) => {
      try {
        await server.register({
          plugin: require('hapi-router'),
          options: { routes: 'src/modules/**/*routes.js' }
        }, { routes: { prefix: '/api' } }) // add '/api' before routes ex: api.x.com/api/ROUTE_NAME
      } catch (error) {
        console.log('--> Error on load routes: ', error)
      }
    },
    name: 'routes',
    version: '1.0.0'
  })
}
