/**
 * when the connection has opened successfully
 * on (event: 'open', listener: (result: WAOpenResult) => void): this
 */
const open = ({ shard, redis, connP }) => async (result) => {
  console.log('event open')

  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'open', data: result }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = open
