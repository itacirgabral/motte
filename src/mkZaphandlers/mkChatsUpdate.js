const seals = require('../seals')

/**
 * when multiple chats are updated (new message, updated message, deleted, pinned, etc)
 * on (event: 'chats-update', listener: (chats: WAChatUpdate[]) => void): this
 */
const chatsUpdate = ({ pubsub, redis, connP }) => chat => {
  console.log('event chats-update')

  pubsub.publish(seals.chatsUpdate, { chatsUpdate: JSON.stringify(chat) })
}

module.exports = chatsUpdate
