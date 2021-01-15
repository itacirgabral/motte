/**
 *  when a chat is updated (new message, updated message, deleted, pinned, presence updated etc)
 * on (event: 'chat-update', listener: (chat: Partial<WAChat> & { jid: string }) => void): this
 */
const chatUpdate = ({ shard, redis, connP }) => {
  const logKey = `zap:${shard}:log`
  const newsKey = `zap:${shard}:news`

  return async (chat) => {
    const json = JSON.stringify({ event: 'chat-update', data: chat })
    const pipeline = redis.pipeline()
    pipeline.lpush(logKey, json)
    pipeline.ltrim(logKey, 0, 99)
    pipeline.publish(newsKey, json)
    await pipeline.exec()

    if (
      Array.isArray(chat?.messages?.array) &&
      chat.messages.array.length === 1 &&
      chat.messages.array[0]?.key?.fromMe
    ) {
      const fifoBakedKey = `zap:${shard}:fifo:bakedBread`
      const jid = chat.messages.array[0].key.remoteJid
      if (chat.messages.array[0]?.message?.extendedTextMessage) {
        const msg = chat.messages.array[0].message.extendedTextMessage.text
        const bakedBread = JSON.stringify({
          type: 'textMessage_v001',
          jid,
          msg
        })
        await redis.lpush(fifoBakedKey, bakedBread)
      }
      if (chat.messages.array[0]?.message?.documentMessage) {
        const mimetype = chat.messages.array[0].message.documentMessage.mimetype
        const bakedBread = JSON.stringify({
          type: 'documentMessage_v001',
          jid,
          mimetype
        })
        await redis.lpush(fifoBakedKey, bakedBread)
      }
    }
  }
}

module.exports = chatUpdate
