
const Redis = require('ioredis')

const zapland = require('./zapland')
const mkZaphandlers = require('./mkZaphandlers')

const britoland = require('./britoland')
const mkBridgehandlers = require('./mkBridgehandlers')


const redisConn = process.env.REDIS_CONN
const redis = new Redis(redisConn)

const pubsub = {
  publish: () => {}
}

let resolverConnPBox
const connPBox = new Promise((resolve, reject) => {
  resolverConnPBox = resolve
})
const zaphandlers = mkZaphandlers({ pubsub, redis, connP: connPBox })
const connP = zapland({ zaphandlers, redis })
resolverConnPBox(connP)

let resolverWsPBox
const wsPBox = new Promise((resolve, reject) => {
  resolverWsPBox = resolve
})
const bridgehandlers = mkBridgehandlers({ wsP: wsPBox, redis })
const wsP = britoland({ bridgehandlers, redis })
resolverWsPBox(wsP)
