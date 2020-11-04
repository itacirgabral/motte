const seals = require('../seals')

/**
 * when the connection has opened successfully
 * on (event: 'open', listener: (result: WAOpenResult) => void): this
 */
const open = ({ pubsub }) => result => {
  console.log('event open')
  console.dir(result)

  pubsub.publish(seals.open, { credentialsUpdated: JSON.stringify(result) })
}

module.exports = open
