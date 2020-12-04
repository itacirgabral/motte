
const Redis = require('ioredis')

const feefifofum = require('./feefifofum')
const britoland = require('./britoland')
const mkBridgehandlers = require('./mkBridgehandlers')

const zapland = require('./zapland')
const mkZaphandlers = require('./mkZaphandlers')

const redisConn = process.env.REDIS_CONN
const redis = new Redis(redisConn)

let resolverWsPBox
const wsPBox = new Promise((resolve, reject) => {
  resolverWsPBox = resolve
})
let resolverConnPBox
const connPBox = new Promise((resolve, reject) => {
  resolverConnPBox = resolve
})
let resolverFifomePBOX
const fifomePBOX = new Promise((resolve, reject) => {
  resolverFifomePBOX = resolve
})

const bridgehandlers = mkBridgehandlers({ wsP: wsPBox, redis, connP: connPBox, fifomeP: fifomePBOX })
const wsP = britoland({ bridgehandlers, redis })
resolverWsPBox(wsP)
const zaphandlers = mkZaphandlers({ wsP, redis, connP: connPBox })
const connP = zapland({ zaphandlers, redis })
resolverConnPBox(connP)

const { fifoMe } = feefifofum({ redis, connP })
resolverFifomePBOX(fifoMe)
