const seals = require('../seals')

/**
 * when the chats has received
 * on (event: 'chats-received', (update: {hasNewChats?: boolean, hasReceivedLastMessage?: boolean}) => void): this
 */
const chatsReceived = ({ pubsub, redis, connP }) => async ({ hasNewChats, hasReceivedLastMessage }) => {
  console.log('event chats-received')
  const conn = await connP

  const knoweds = conn.chats.array
    .filter(({ jid = '' }) => jid.split('@s.whatsapp.net').length === 2)
    .map(({ jid }) => jid)

  const length = knoweds.length
  console.log(`${length} contacts`)
  await redis.sadd('contacts', knoweds)

  pubsub.publish(seals.chatsReceived, { chatsReceived: length })
}

module.exports = chatsReceived
