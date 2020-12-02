const seals = require('../seals')

/**
 * when WA updates the credentials
 * on (event: 'credentials-updated', listener: (auth: AuthenticationCredentials) => void): this
 */
const credentialsUpdated = ({ pubsub, redis, connP }) => async (auth) => {
  console.log('event credentials-updated')
  const creds = {
    clientID: auth.clientID,
    serverToken: auth.serverToken,
    clientToken: auth.clientToken,
    encKey: auth.encKey.toString('base64'),
    macKey: auth.macKey.toString('base64')
  }

  const credentialsUpdated = JSON.stringify(creds)

  pubsub.publish(seals.credentialsUpdated, { credentialsUpdated })

  const pipeline = redis.pipeline()
  pipeline.set('creds', credentialsUpdated)
  pipeline.bgsave()

  await pipeline.exec()
}

module.exports = credentialsUpdated
