const seals = require('../seals')

/**
 * when the connection has been validated
 * on (event: 'connection-validated', listener: (user: WAUser) => void): this
 */
const connectionValidated = ({ pubsub, redis, connP }) => user => {
  console.log('event connection-validated')

  pubsub.publish(seals.connectionValidated, { connectionValidated: JSON.stringify(user) })
}

module.exports = connectionValidated
