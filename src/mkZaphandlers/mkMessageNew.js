const seals = require('../seals')
const { MessageType } = require('@adiwajshing/baileys')

/**
 * when a new message is relayed
 * on (event: 'message-new', listener: (message: WAMessage) => void): this
 */
const messageNew = ({ pubsub, redis, connP }) => async (message) => {
  console.log('event message-new')
  console.dir(message)

  if (message.key.fromMe) {
    const to = message.key.remoteJid
    const messageText = message.message.extendedTextMessage.text

    const pipeline = redis.pipeline()
    pipeline.lindex('batchLast', -1)// 0
    pipeline.hget('batchInfo', 'to')// 1
    pipeline.hlen('batchInfo')// 2
    const result = await pipeline.exec()

    if (to === result[1][1] && messageText === result[0][1]) {
      const idx = String(Number(result[2][1]) - 2) // -(to + length)
      const pipeline = redis.pipeline()
      pipeline.rpop('batchLast')// 0
      pipeline.rpoplpush('batchList', 'batchLast')// 1
      pipeline.hset('batchInfo', `timestamps:${idx}:back`, Date.now())// 2
      const result2 = await pipeline.exec()
      const batchLast = result2[1][1]

      if (batchLast) {
        setTimeout(async () => {
          const conn = await connP
          conn.sendMessage(to, batchLast, MessageType.text)
          redis.hset('batchInfo', `timestamps:${Number(idx) + 1}:go`, Date.now())
        }, batchLast.lengtbatchLasth > 50 ? 1900 : batchLast.length * 20)
      }
    }
  }

  pubsub.publish(seals.messageNew, { messageNew: JSON.stringify(message) })
}

module.exports = messageNew
