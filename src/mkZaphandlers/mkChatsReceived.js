const seals = require('../seals')

/**
 * when chats are sent by WA, and when all messages are received from WhatsApp
 * on (event: 'chats-received', (update: {hasNewChats?: boolean, hasReceivedLastMessage?: boolean}) => void): this
 */
const chatsReceived = ({ pubsub, redis, connP }) => async ({ hasNewChats, hasReceivedLastMessage }) => {
  console.log('event chats-received')
  const conn = await connP

  const knoweds = conn.chats.array
    .filter(({ jid = '' }) => jid.split('@s.whatsapp.net').length === 2)
    .map(({ jid }) => jid)

  const length = knoweds.length
  await redis.sadd('contacts', knoweds)

  pubsub.publish(seals.chatsReceived, { chatsReceived: length })
}

module.exports = chatsReceived
