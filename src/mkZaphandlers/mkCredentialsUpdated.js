const seals = require('../seals')

/**
 * when WA updates the credentials
 * on (event: 'credentials-updated', listener: (auth: AuthenticationCredentials) => void): this
 */
const credentialsUpdated = ({ pubsub, redis, connP }) => async (auth) => {
  const creds = {
    clientID: auth.clientID,
    serverToken: auth.serverToken,
    clientToken: auth.clientToken,
    encKey: auth.encKey.toString('base64'),
    macKey: auth.macKey.toString('base64')
  }

  const credentialsUpdated = JSON.stringify(creds)

  console.log('event credentials-updated')
  console.log(credentialsUpdated)
  pubsub.publish(seals.credentialsUpdated, { credentialsUpdated })

  await redis.set('creds', credentialsUpdated)
}

module.exports = credentialsUpdated
