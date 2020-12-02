const seals = require('../seals')

/**
 * when a new chat is added
 * on (event: 'chat-new', listener: (chat: WAChat) => void): this
 */
const chatNew = ({ pubsub, redis, connP }) => chat => {
  console.log('event chat-new')

  pubsub.publish(seals.chatNew, { chatNew: JSON.stringify(chat) })
}

module.exports = chatNew
