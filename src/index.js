const Redis = require('ioredis')

const redisConn = process.env.REDIS_CONN
const myhardid = process.env.HARDID
const healthreportinterval = process.env.HEALTHREPORTINTERVAL
let healthreportintervalid = 0
const panoptickey = 'zap:panoptic'
const catcherrKey = 'zap:catcherr'

const patchpanel = new Map()

const actbooting = JSON.stringify({ type: 'booting', hardid: myhardid, timestamp: Date.now() })
const mkactbigerr = ({ err }) => JSON.stringify({ type: 'bigerr', hardid: myhardid, err, timestamp: Date.now() })
const mkhealthreport = () => JSON.stringify({ type: 'healthreport', hardid: myhardid, totalconnections: patchpanel.size, timestamp: Date.now() })

const speaker = new Redis(redisConn)
const listener = new Redis(redisConn)

;(async () => {
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
          }
        }
      })

      // I'm OK bro
      await speaker.publish(panoptickey, mkhealthreport())
      healthreportintervalid = setInterval(async () => {
        await speaker.publish(panoptickey, mkhealthreport())
      }, Number(healthreportinterval))

      await gracefuldownpromise
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
})()
