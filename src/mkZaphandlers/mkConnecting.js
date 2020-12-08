/**
 *  when the connection is opening
 * on (event: 'connecting', listener: () => void): this
 */
const connecting = ({ shard, redis, connP }) => async () => {
  console.log('event connecting')

  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'connecting', data: null }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = connecting
