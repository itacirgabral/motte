const seals = require('../seals')

/**
 * when multiple chats are updated (new message, updated message, deleted, pinned, etc)
 * on (event: 'chats-update', listener: (chats: WAChatUpdate[]) => void): this
 */
const chatsUpdate = ({ pubsub, redis, connP }) => chats => {
  console.log('event chats-update')

  pubsub.publish(seals.chatsUpdate, { chatsUpdate: JSON.stringify(chats) })
}

module.exports = chatsUpdate
