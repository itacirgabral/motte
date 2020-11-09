const seals = require('../seals')

/**
 * when a new chat is added
 * on (event: 'chat-new', listener: (chat: WAChat) => void): this
 */
const chatNew = ({ pubsub, redis }) => chat => {
  console.log('event chat-new')
  console.dir(chat)

  pubsub.publish(seals.chatNew, { chatNew: JSON.stringify(chat) })
}

module.exports = chatNew
