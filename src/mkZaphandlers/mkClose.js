const seals = require('../seals')

/**
 * when the connection has closed
 * on (event: 'close', listener: (err: {reason?: DisconnectReason | string, isReconnecting: boolean}) => void): this
 */
const close = ({ pubsub, redis, connP }) => err => {
  console.log('event close')

  pubsub.publish(seals.close, { close: JSON.stringify(err) })
}

module.exports = close
