const { MessageType, Presence } = require('@adiwajshing/baileys')
const delay = require('./delay')
/*
** Fee-fi-fo-fum,
** I smell the blood of an Englishman,
** Be he alive, or be he dead
** I'll grind his bones to make my bread.
*/

const fifoDrumer = ({ shard, redis, connP, redisB }) => {
  const fifoRawKey = `zap:${shard}:fifo:rawBread`
  const fifoBakedKey = `zap:${shard}:fifo:bakedBread`

  const lastRawKey = `zap:${shard}:last:rawBread`
  const lastBakedKey = `zap:${shard}:last:bakedBread`

  const healthcare = {
    playing: true,
    fifoRawKey,
    fifoBakedKey,
    lastRawKey,
    lastBakedKey
  }

  process.nextTick(async () => {
    let rawBread
    let conn
    let whowewaitfor
    while (healthcare.playing) {
      rawBread = await redisB.brpoplpush(fifoRawKey, lastRawKey, 0)
      const { type, ...crumb } = JSON.parse(rawBread)

      if (type === 'textMessage_v001') {
        const { jid, msg } = crumb
        const delta = msg.length
        const waittime = delta > 50 ? 6000 : delta * 100 + 100

        conn = await connP

        conn.updatePresence(jid, Presence.composing)
        await delay(waittime)
        conn.sendMessage(jid, msg, MessageType.text)
        conn.updatePresence(jid, Presence.available)

        whowewaitfor = await redisB.brpoplpush(fifoBakedKey, lastBakedKey, 0)
        const { type, ...crumb2 } = JSON.parse(whowewaitfor)
        if (type === 'textMessage_v001' && jid === crumb2.jid && msg === crumb2.msg) {
          // cleanup
          const pipeline = redis.pipeline()
          pipeline.ltrim(lastRawKey, 0, -2)
          pipeline.ltrim(lastBakedKey, 0, -2)
          await pipeline.exec()
        }
      }
    }
  })

  return healthcare
}

module.exports = fifoDrumer

// const redisB = new Redis(redisConn)
// const { fifoMe } = feefifofum({ shard, redis, connP, redisB })
// resolverFifomePBOX(fifoMe)
/*
{
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
*/
