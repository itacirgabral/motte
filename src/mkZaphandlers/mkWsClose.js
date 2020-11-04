/**
 *  when the socket has closed
 * on (event: 'ws-close', listener: (err: {reason?: DisconnectReason | string}) => void): this
 */

const wsClose = ({ pubsub }) => err => {
  console.log('event ws-close')
  console.dir(err)
}

module.exports = wsClose
