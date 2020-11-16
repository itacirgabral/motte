const seals = require('../seals')

/**
 *  when the socket has closed
 * on (event: 'ws-close', listener: (err: {reason?: DisconnectReason | string}) => void): this
 */
const wsClose = ({ pubsub, redis, connP }) => err => {
  console.log('event ws-close')
  console.dir(err)

  pubsub.publish(seals.wsClose, { credentialsUpdated: JSON.stringify(err) })
}

module.exports = wsClose
