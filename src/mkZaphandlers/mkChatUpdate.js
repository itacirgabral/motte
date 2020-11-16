const seals = require('../seals')

/**
 * when a chat is updated (archived, deleted, pinned)
 * on (event: 'chat-update', listener: (chat: Partial<WAChat> & { jid: string }) => void): this
 */
const chatUpdate = ({ pubsub, redis, connP }) => chat => {
  console.log('event chat-update')
  console.dir(chat)

  pubsub.publish(seals.chatUpdate, { chatNew: JSON.stringify(chat) })
}

module.exports = chatUpdate
