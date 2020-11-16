const { MessageType, Presence } = require('@adiwajshing/baileys')
const seals = require('../seals')

/**
 * when a new message is relayed
 * on (event: 'message-new', listener: (message: WAMessage) => void): this
 */
const messageNew = ({ pubsub, redis, connP }) => async (message) => {
  console.log('event message-new')
  console.dir(message)

  pubsub.publish(seals.messageNew, { messageNew: JSON.stringify(message) })

  if (message.key.fromMe && message.message.extendedTextMessage) {
    console.log('FROM ME')
    console.log(JSON.stringify(message, null, 2))
    const to = message.key.remoteJid
    const messageText = message.message.extendedTextMessage.text

    const pipeline = redis.pipeline()
    pipeline.lindex('batchLast', -1)// 0
    pipeline.hget('batchInfo', 'to')// 1
    pipeline.hlen('batchInfo')// 2
    const result = await pipeline.exec()

    if (to === result[1][1] && messageText === result[0][1]) {
      const idx = String(Number(result[2][1]) - 2) // -to  -length
      const pipeline = redis.pipeline()
      pipeline.rpop('batchLast')// 0
      pipeline.rpoplpush('batchList', 'batchLast')// 1
      pipeline.hset('batchInfo', `timestamps:${idx}:back`, Date.now())// 2
      const result2 = await pipeline.exec()
      const batchLast = result2[1][1]

      if (batchLast) {
        const conn = await connP
        conn.updatePresence(to, Presence.composing)
        setTimeout(async () => {
          conn.sendMessage(to, batchLast, MessageType.text)
          conn.updatePresence(to, Presence.available)
          redis.hset('batchInfo', `timestamps:${Number(idx) + 1}:go`, Date.now())
        }, batchLast.lengtbatchLasth > 50 ? 1900 : batchLast.length * 20)
      }
    }
  }
}

module.exports = messageNew
