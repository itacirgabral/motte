
const Redis = require('ioredis')

const fifoDrumer = require('./fifoDrumer')
const zapland = require('./zapland')
const mkZaphandlers = require('./mkZaphandlers')

const redisConn = process.env.REDIS_CONN
const redis = new Redis(redisConn)
const redisB = new Redis(redisConn)

let resolverConnPBox
const connPBox = new Promise((resolve, reject) => {
  resolverConnPBox = resolve
})

const shard = process.env.SHARD
const zaphandlers = mkZaphandlers({ shard, redis, connP: connPBox })
const connP = zapland({ shard, zaphandlers, redis })
resolverConnPBox(connP)

const drummer1 = fifoDrumer({ shard, redis, connP, redisB })
console.log(drummer1.playing ? 'drummer 1 OK' : 'NO drummer 1')
