const Redis = require('ioredis')

const mkZaphandlers = require('./mkZaphandlers')
const zapland = require('./zapland')
const fifoDrumer = require('./fifoDrumer')

const redisConn = process.env.REDIS_CONN
const myhardid = process.env.HARDID
const healthreportinterval = process.env.HEALTHREPORTINTERVAL
let healthreportintervalid = 0
const panoptickey = 'zap:panoptic'
const catcherrKey = 'zap:catcherr'

const patchpanel = new Map()
const zigotopanel = new Map()

const actbooting = JSON.stringify({ type: 'booting', hardid: myhardid, timestamp: Date.now() })
const mkactbigerr = ({ err }) => JSON.stringify({ type: 'bigerr', hardid: myhardid, err, timestamp: Date.now() })
const mkhealthreport = () => JSON.stringify({ type: 'healthreport', hardid: myhardid, totalconnections: patchpanel.size, timestamp: Date.now() })

const speaker = new Redis(redisConn)
const listener = new Redis(redisConn)

/*
SOLDA EMPTY BAILEYS
*/
const fetch = require('node-fetch')
const jsonwebtoken = require('jsonwebtoken')
const { WAConnection } = require('@adiwajshing/baileys')
let WA
const jwtsecret = process.env.JWT_SECRET
const mkcredskey = shard => `zap:${shard}:creds`
const redis = new Redis(redisConn)
/*
SOLDA EMPTY BAILEYS
*/

const trafficwand = async () => {
  let sisyphus = true
  while (sisyphus) {
    try {
      // open the while loop
      sisyphus = false
      await speaker.publish(panoptickey, actbooting)

      // promise gate
      let gracefuldownresolver
      const gracefuldownpromise = new Promise((resolve, reject) => {
        gracefuldownresolver = resolve
      })

      // screw on the redis
      await listener.subscribe(panoptickey)
      listener.on('message', (channel, message) => {
        const { hardid, type, ...leftover } = JSON.parse(message)

        // is it to me?
        if (hardid === myhardid) {
          switch (type) {
            case 'gracefuldown':
              clearInterval(healthreportintervalid)
              gracefuldownresolver()
              break
            case 'connect':
              if (!patchpanel.has(leftover.shard)) {
                let resolverConnPBox
                const connPBox = new Promise((resolve, reject) => {
                  resolverConnPBox = resolve
                })

                const zaphandlers = mkZaphandlers({ shard: leftover.shard, redis: speaker, connP: connPBox })
                const connP = zapland({ shard: leftover.shard, zaphandlers, redis: speaker })
                resolverConnPBox(connP)

                const drummer = fifoDrumer({ shard: leftover.shard, redis: speaker, connP, redisB: listener.duplicate() })

                patchpanel.set(leftover.shard, {
                  drummer,
                  connP
                })
                console.log(`connect ${leftover.shard}`)
              }
              break
            case 'disconnect':
              if (patchpanel.has(leftover.shard)) {
                const { connP } = patchpanel.get(leftover.shard)
                patchpanel.delete(leftover.shard)
                connP
                  .then(conn => {
                    conn.close()
                    console.log(`disconnect ${leftover.shard}`)
                  })
              }
              break
            case 'signupconnection':
              /*
              SOLDA EMPTY BAILEYS
              */
              if (!zigotopanel.has(leftover.shard)) {
                // zigotopanel.set()
                console.log(leftover)
                WA = new WAConnection()
                WA.browserDescription = ['BROODERHEN', 'Chrome', '87']
                WA.on('qr', async qr => {
                  await fetch(leftover.url, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ qr })
                  })
                })
                WA.on('credentials-updated', async auth => {
                  console.log('credentials-updated')
                  const creds = JSON.stringify({
                    clientID: auth.clientID,
                    serverToken: auth.serverToken,
                    clientToken: auth.clientToken,
                    encKey: auth.encKey.toString('base64'),
                    macKey: auth.macKey.toString('base64')
                  })

                  WA.creds = creds
                  console.log(`creds=${creds}`)
                })
                WA.on('open', async () => {
                  if (leftover.shard === WA.user.jid.split('@s.whatsapp.net')[0]) {
                    setTimeout(async () => {
                      WA.close()
                      // zigotopanel.delete()
                    }, 20000)
                    await redis.set(mkcredskey(leftover.shard), WA.creds)
                    const jwt = jsonwebtoken.sign(leftover.shard, jwtsecret)
                    await fetch(leftover.url, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ jwt })
                    })
                  } else {
                    await fetch(leftover.url, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ error: true, message: 'mismatch numbers' })
                    })
                  }
                })

                WA.connect().catch(console.error)
              }
              /*
              SOLDA EMPTY BAILEYS
              */
              break
          }
        }
      })

      // I'm OK bro
      await speaker.publish(panoptickey, mkhealthreport())
      healthreportintervalid = setInterval(async () => {
        await speaker.publish(panoptickey, mkhealthreport())
      }, Number(healthreportinterval))

      // promise gate door
      await gracefuldownpromise
      console.log('gracefuldown')
    } catch (err) {
      // lock the while loop
      sisyphus = true

      const actbigerr = mkactbigerr({ err })
      const warnlogs = await Promise.all([
        speaker.publish(panoptickey, actbigerr),
        speaker.lpush(catcherrKey, actbigerr)
      ])

      console.error(warnlogs)
    }
  }

  process.exit(0)
}

trafficwand()
