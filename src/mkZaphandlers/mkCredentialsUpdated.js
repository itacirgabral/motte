/**
 * when WA updates the credentials
 * on (event: 'credentials-updated', listener: (auth: AuthenticationCredentials) => void): this
 */
const credentialsUpdated = ({ shard, redis, connP }) => async (auth) => {
  const creds = {
    clientID: auth.clientID,
    serverToken: auth.serverToken,
    clientToken: auth.clientToken,
    encKey: auth.encKey.toString('base64'),
    macKey: auth.macKey.toString('base64')
  }

  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'credentials-updated', data: creds }))
  pipeline.ltrim(logKey, 0, 99)

  const credentialsUpdated = JSON.stringify(creds)
  const credsKey = `zap:${shard}:creds`
  pipeline.set(credsKey, credentialsUpdated)
  pipeline.bgsave()

  await pipeline.exec()
}

module.exports = credentialsUpdated
