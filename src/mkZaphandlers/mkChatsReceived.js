const seals = require('../seals')

/**
 * when chats are sent by WA, and when all messages are received from WhatsApp
 * on (event: 'chats-received', (update: {hasNewChats?: boolean, hasReceivedLastMessage?: boolean}) => void): this
 */
const chatsReceived = ({ pubsub, redis, connP }) => async ({ hasNewChats, hasReceivedLastMessage }) => {
  console.log('event chats-received')
  const conn = await connP

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'chat-new', data: { hasNewChats, hasReceivedLastMessage } }))
  pipeline.ltrim('log:baileys:test', 0, 99)

  const knoweds = conn.chats.array
    .filter(({ jid = '' }) => jid.split('@s.whatsapp.net').length === 2)
    .map(({ jid }) => jid)

  const length = knoweds.length
  pipeline.sadd('contacts', knoweds)

  await pipeline.exec()

  pubsub.publish(seals.chatsReceived, { chatsReceived: length })
}

module.exports = chatsReceived
