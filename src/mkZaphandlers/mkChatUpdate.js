const { MessageType, Presence } = require('@adiwajshing/baileys')

const seals = require('../seals')

/**
 * when a chat is updated (archived, deleted, pinned)
 * on (event: 'chat-update', listener: (chat: Partial<WAChat> & { jid: string }) => void): this
 */
const chatUpdate = ({ pubsub, redis, connP }) => async (chat) => {
  console.log('event chat-update')
  console.dir(chat)

  if (
    Array.isArray(chat?.messages?.array) &&
    chat.messages.array.length === 1 &&
    chat.messages.array[0]?.key?.fromMe &&
    chat.messages.array[0]?.message?.extendedTextMessage
  ) {
    const to = chat.messages.array[0].key.remoteJid
    const messageText = chat.messages.array[0].message.extendedTextMessage.text

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
      } else {
        await redis.hset('batchDelivery', 'status', 'done')
      }
    }
  }

  pubsub.publish(seals.chatUpdate, { chatUpdate: JSON.stringify(chat) })
}

module.exports = chatUpdate
