const { MessageType, Presence } = require('@adiwajshing/baileys')
/*
** Fee-fi-fo-fum,
** I smell the blood of an Englishman,
** Be he alive, or be he dead
** I'll grind his bones to make my bread.
*/

const feefifofum = ({ placa = 'plutocharon851557', redis, connP, redisB }) => {
  const fifo = `fifo:${placa}`
  const fifoLast = `fifo:${placa}:last`
  const echo = `fifo:${placa}:echo`
  const echoLast = `fifo:${placa}:echo:last`

  const fifoDrumer = async () => {
    const pipeline = redis.pipeline()
    pipeline.llen(fifo) // 0
    pipeline.llen(fifoLast) // 1
    pipeline.llen(echo) // 2
    pipeline.llen(echoLast) // 3

    const result = await pipeline.exec()
    const [
      [, fifoLength],
      [, fifoLastLength],
      [, echoLength],
      [, echoLastLength]
    ] = result

    console.log(`fifoLength=${fifoLength} fifoLastLength=${fifoLastLength} echoLength=${echoLength} echoLastLength=${echoLastLength}`)
    if (fifoLength > 0 && fifoLastLength === 0 && echoLength === 0 && echoLastLength === 0) {
      const conn = await connP
      const lastBread = await redis.rpoplpush(fifo, fifoLast)
      const { type, ...breadOf } = JSON.parse(lastBread)

      if (type === 'textMessage_v001') {
        const delta = breadOf.msg.length
        const waittime = delta > 50 ? 6000 : delta * 100 + 100
        conn.updatePresence(breadOf.jid, Presence.composing)
        setTimeout(async () => {
          conn.sendMessage(breadOf.jid, breadOf.msg, MessageType.text)
          conn.updatePresence(breadOf.jid, Presence.available)
        }, waittime)

        const whowewaitfor = await redisB.brpoplpush(echo, echoLast, 0)

        const { type, ...breadOf2 } = JSON.parse(whowewaitfor)
        if (type === 'textMessage_v001' && breadOf.jid === breadOf2.jid && breadOf.msg === breadOf2.msg) {
          const pipeline2 = redis.pipeline()
          pipeline2.ltrim(fifoLast, 0, -2)
          pipeline2.ltrim(echoLast, 0, -2)
          await pipeline2.exec()

          fifoDrumer()
        }
      }
    }
  }
  return {
    // send the bread to the giant fifo
    fifoMe: async ({ jid, msg }) => {
      const fifoBread = JSON.stringify({
        type: 'textMessage_v001',
        jid,
        msg
      })
      await redis.lpush(fifo, fifoBread)

      // wakeup the drummer
      fifoDrumer()
    }
  }
}

module.exports = feefifofum

// const redisB = new Redis(redisConn)
// const { fifoMe } = feefifofum({ redis, connP, redisB })
// resolverFifomePBOX(fifoMe)
