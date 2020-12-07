/**
 *  when a chat is updated (new message, updated message, deleted, pinned, presence updated etc)
 * on (event: 'chat-update', listener: (chat: Partial<WAChat> & { jid: string }) => void): this
 */
const chatUpdate = ({ placa = 'plutocharon851557', wsP, redis, connP }) => async (chat) => {
  console.log('event chat-update')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'chat-update', data: chat }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  if (
    Array.isArray(chat?.messages?.array) &&
    chat.messages.array.length === 1 &&
    chat.messages.array[0]?.key?.fromMe &&
    chat.messages.array[0]?.message?.extendedTextMessage
  ) {
    const echo = `fifo:${placa}:echo`
    const jid = chat.messages.array[0].key.remoteJid
    const msg = chat.messages.array[0].message.extendedTextMessage.text
    const fifoBread = JSON.stringify({
      type: 'textMessage_v001',
      jid,
      msg
    })
    await redis.lpush(echo, fifoBread)
  }

  const ws = await wsP
  ws.send(JSON.stringify({
    t: 7,
    d: {
      topic: 'chat',
      event: 'message',
      data: {
        username: 'zapguiado',
        body: JSON.stringify({ event: 'chat-update', data: chat })
      }
    }
  }))
}

module.exports = chatUpdate
