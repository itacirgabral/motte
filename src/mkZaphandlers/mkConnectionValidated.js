/**
 * when the connection has been validated
 * on (event: 'connection-validated', listener: (user: WAUser) => void): this
 */
const connectionValidated = ({ shard, redis, connP }) => async (user) => {
  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'connection-validated', data: user }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = connectionValidated
