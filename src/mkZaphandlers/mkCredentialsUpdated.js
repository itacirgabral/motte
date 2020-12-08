/**
 * when WA updates the credentials
 * on (event: 'credentials-updated', listener: (auth: AuthenticationCredentials) => void): this
 */
const credentialsUpdated = ({ redis, connP }) => async (auth) => {
  console.log('event credentials-updated')
  const creds = {
    clientID: auth.clientID,
    serverToken: auth.serverToken,
    clientToken: auth.clientToken,
    encKey: auth.encKey.toString('base64'),
    macKey: auth.macKey.toString('base64')
  }

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'credentials-updated', data: creds }))
  pipeline.ltrim('log:baileys:test', 0, 99)

  const credentialsUpdated = JSON.stringify(creds)

  pipeline.set('creds', credentialsUpdated)
  pipeline.bgsave()

  await pipeline.exec()
}

module.exports = credentialsUpdated
