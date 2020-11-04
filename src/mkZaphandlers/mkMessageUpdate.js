/**
 * when a message object itself is updated (receives its media info or is deleted)
 * on (event: 'message-update', listener: (message: WAMessage) => void): this
 */
const messageUpdate = ({ pubsub }) => message => {
  console.log('event message-update')
  console.dir(message)
}

module.exports = messageUpdate
