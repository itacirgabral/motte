const seals = require('../seals')

/**
 *  when the socket has closed
 * on (event: 'ws-close', listener: (err: {reason?: DisconnectReason | string}) => void): this
 */
const wsClose = ({ pubsub, redis, connP }) => err => {
  console.log('event ws-close')

  pubsub.publish(seals.wsClose, { wsClose: JSON.stringify(err) })
}

module.exports = wsClose
