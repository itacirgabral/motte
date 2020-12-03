/**
 * when chats are sent by WA, and when all messages are received from WhatsApp
 * on (event: 'chats-received', (update: {hasNewChats?: boolean, hasReceivedLastMessage?: boolean}) => void): this
 */
const chatsReceived = ({ wsP, redis, connP }) => async ({ hasNewChats, hasReceivedLastMessage }) => {
  console.log('event chats-received')
  const conn = await connP

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'chat-new', data: { hasNewChats, hasReceivedLastMessage } }))
  pipeline.ltrim('log:baileys:test', 0, 99)

  const knoweds = conn.chats.array
    .filter(({ jid = '' }) => jid.split('@s.whatsapp.net').length === 2)
    .map(({ jid }) => jid)
  pipeline.sadd('contacts', knoweds)

  await pipeline.exec()

  const ws = await wsP
  ws.send(JSON.stringify({
    t: 7,
    d: {
      topic: 'chat',
      event: 'message',
      data: {
        username: 'zapguiado',
        body: JSON.stringify({ event: 'chat-new', data: { event: 'chat-new', data: { hasNewChats, hasReceivedLastMessage } } })
      }
    }
  }))
}

module.exports = chatsReceived
