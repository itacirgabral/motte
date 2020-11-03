/**
 * when a message's status is updated (deleted, delivered, read, sent etc.)
 * on (event: 'message-status-update', listener: (message: WAMessageStatusUpdate) => void): this
 */
const messageStatusUpdate = message => {
  console.log('event message-status-update')
  console.dir(message)
}

module.exports = messageStatusUpdate
