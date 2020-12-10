/**
 * when the connection has been validated
 * on (event: 'connection-validated', listener: (user: WAUser) => void): this
 */
const connectionValidated = ({ shard, redis, connP }) => async (user) => {
  const logKey = `zap:${shard}:log`
  const newsKey = `zap:${shard}:news`
  const json = JSON.stringify({ event: 'connection-validated', data: user })
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, json)
  pipeline.ltrim(logKey, 0, 99)
  pipeline.publish(newsKey, json)
  await pipeline.exec()
}

module.exports = connectionValidated
