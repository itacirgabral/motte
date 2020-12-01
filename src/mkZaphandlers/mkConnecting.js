const seals = require('../seals')

/**
 *  when the connection is opening
 * on (event: 'connecting', listener: () => void): this
 */
const connecting = ({ pubsub, redis, connP }) => () => {
  console.log('event connecting')

  pubsub.publish(seals.connecting, { connecting: JSON.stringify(true) })
}

module.exports = connecting
