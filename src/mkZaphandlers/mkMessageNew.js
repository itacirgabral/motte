const seals = require('../seals')

/**
 * when a new message is relayed
 * on (event: 'message-new', listener: (message: WAMessage) => void): this
 */
const messageNew = ({ pubsub, redis }) => message => {
  console.log('event message-new')
  console.dir(message)

  pubsub.publish(seals.messageNew, { messageNew: JSON.stringify(message) })
}

module.exports = messageNew
