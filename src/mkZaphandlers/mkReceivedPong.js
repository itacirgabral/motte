const seals = require('../seals')

/**
 * when WA sends back a pong
 * on (event: 'received-pong', listener: () => void): this
 */
const receivedPong = ({ pubsub, redis, connP }) => user => {
  console.log('event received-pong')

  pubsub.publish(seals.receivedPong, { receivedPong: JSON.stringify(user) })
}

module.exports = receivedPong
