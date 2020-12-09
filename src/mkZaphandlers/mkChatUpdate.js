/**
 *  when a chat is updated (new message, updated message, deleted, pinned, presence updated etc)
 * on (event: 'chat-update', listener: (chat: Partial<WAChat> & { jid: string }) => void): this
 */
const chatUpdate = ({ shard, redis, connP }) => async (chat) => {
  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'chat-update', data: chat }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()

  if (
    Array.isArray(chat?.messages?.array) &&
    chat.messages.array.length === 1 &&
    chat.messages.array[0]?.key?.fromMe &&
    chat.messages.array[0]?.message?.extendedTextMessage
  ) {
    const fifoBakedKey = `zap:${shard}:fifo:bakedBread`
    const jid = chat.messages.array[0].key.remoteJid
    const msg = chat.messages.array[0].message.extendedTextMessage.text
    const bakedBread = JSON.stringify({
      type: 'textMessage_v001',
      jid,
      msg
    })
    await redis.lpush(fifoBakedKey, bakedBread)
  }
}

module.exports = chatUpdate
