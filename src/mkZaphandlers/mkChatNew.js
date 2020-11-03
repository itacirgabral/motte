/**
 * when a new chat is added
 * on (event: 'chat-new', listener: (chat: WAChat) => void): this
 */
const chatNew = ({ pubsub }) => chat => {
  console.log('event chat-new')
  console.dir(chat)
}

module.exports = chatNew
