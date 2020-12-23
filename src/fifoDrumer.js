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

  const statsKey = `zap:${shard}:stats`
  const lastsentmessagetimestamp = 'lastsentmessagetimestamp'
  const totalsentmessage = 'totalsentmessage'
  const sortmeandelta = 'sortmeandelta'
  const longmeandelta = 'longmeandelta'

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

        const timestampStart = Date.now()
        conn.sendMessage(jid, msg, MessageType.text)
        conn.updatePresence(jid, Presence.available)

        whowewaitfor = await redisB.brpoplpush(fifoBakedKey, lastBakedKey, 0)
        const { type, ...crumb2 } = JSON.parse(whowewaitfor)
        if (type === 'textMessage_v001' && jid === crumb2.jid && msg === crumb2.msg) {
          const timestampFinish = Date.now()
          const delta = timestampFinish - timestampStart

          const pipeline = redis.pipeline()
          pipeline.ltrim(lastRawKey, 0, -2) // 0
          pipeline.ltrim(lastBakedKey, 0, -2) // 1
          pipeline.hset(statsKey, lastsentmessagetimestamp, timestampFinish) // 2
          pipeline.hget(statsKey, sortmeandelta) // 3
          pipeline.hget(statsKey, longmeandelta) // 4
          const [, , , [, longDelta], [, sortDelta]] = await pipeline.exec()

          const newSortDelta = (delta + (Number(sortDelta) || delta)) / 2
          const newLongDelta = (delta + 4 * (Number(longDelta) || delta)) / 5

          const pipelineDelta = redis.pipeline()
          pipelineDelta.hset(statsKey, sortmeandelta, Number.isInteger(newSortDelta) ? newSortDelta : delta)
          pipelineDelta.hset(statsKey, longmeandelta, Number.isInteger(newLongDelta) ? newLongDelta : delta)
          pipelineDelta.hincrby(statsKey, totalsentmessage, 1)

          await pipelineDelta.exec()
        }
      }
    }
  })

  return healthcare
}

module.exports = fifoDrumer
