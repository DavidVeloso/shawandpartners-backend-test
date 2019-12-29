'use strict'

const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const bootstrap = require('../core/bootstrap')
const lab = exports.lab = Lab.script()

global.expect = Code.expect

global.it = lab.it
global.before = lab.before
global.beforeEach = lab.beforeEach
global.after = lab.after
global.describe = lab.describe

global.describe('#Load server', () => {
  global.before(async (done) => {
    try {
      const server = await bootstrap.start()
      global.server = server
      console.log('--> Test Server Ok!')
    } catch (error) {
      console.log('Error loading bootstrap: ', error)
      throw error
    }
  })

  global.it('load server finalized', async () => {
    global.expect(global.server).to.exist()
  })
})
