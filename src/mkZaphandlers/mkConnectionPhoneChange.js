const seals = require('../seals')

/**
 * when the connection to the phone changes
 * on (event: 'connection-phone-change', listener: (state: {connected: boolean}) => void): this
 */
const connectionPhoneChange = ({ pubsub, redis, connP }) => state => {
  console.log('event connection-phone-change')
  console.dir(state)

  pubsub.publish(seals.connectionPhoneChange, { credentialsUpdated: JSON.stringify(state) })
}

module.exports = connectionPhoneChange
