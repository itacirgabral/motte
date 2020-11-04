const seals = require('../seals')

/**
 * when a message's status is updated (deleted, delivered, read, sent etc.)
 * on (event: 'message-status-update', listener: (message: WAMessageStatusUpdate) => void): this
 */
const messageStatusUpdate = ({ pubsub }) => message => {
  console.log('event message-status-update')
  console.dir(message)

  pubsub.publish(seals.messageStatusUpdate, { messageStatusUpdate: JSON.stringify(message) })
}

module.exports = messageStatusUpdate
