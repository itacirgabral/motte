const seals = require('../seals')

/**
 * when a message object itself is updated (receives its media info or is deleted)
 * on (event: 'message-update', listener: (message: WAMessage) => void): this
 */
const messageUpdate = ({ pubsub, redis, connP }) => message => {
  console.log('event message-update')
  console.dir(message)

  pubsub.publish(seals.messageUpdate, { messageUpdate: JSON.stringify(message) })
}

module.exports = messageUpdate
