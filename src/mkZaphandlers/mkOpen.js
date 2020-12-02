const seals = require('../seals')

/**
 * when the connection has opened successfully
 * on (event: 'open', listener: (result: WAOpenResult) => void): this
 */
const open = ({ pubsub, redis, connP }) => result => {
  console.log('event open')

  pubsub.publish(seals.open, { open: JSON.stringify(result) })
}

module.exports = open
