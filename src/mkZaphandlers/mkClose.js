/**
 * when the connection has closed
 * on (event: 'close', listener: (err: {reason?: DisconnectReason | string, isReconnecting: boolean}) => void): this
 */

const close = ({ pubsub }) => err => {
  console.log('event close')
  console.dir(err)
}

module.exports = close
