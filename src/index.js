
const Redis = require('ioredis')

const feefifofum = require('./feefifofum')
const zapland = require('./zapland')
const mkZaphandlers = require('./mkZaphandlers')

const redisConn = process.env.REDIS_CONN
const redis = new Redis(redisConn)

let resolverConnPBox
const connPBox = new Promise((resolve, reject) => {
  resolverConnPBox = resolve
})

const zaphandlers = mkZaphandlers({ redis, connP: connPBox })
const connP = zapland({ zaphandlers, redis })
resolverConnPBox(connP)

