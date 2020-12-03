
const Redis = require('ioredis')

const zapland = require('./zapland')
// const mkResolvers = require('./mkResolvers')
const mkZaphandlers = require('./mkZaphandlers')

const host = process.env.HOST_IP
const port = process.env.HOST_PORT
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
