/**
 * when WA sends back a pong
 * on (event: 'received-pong', listener: () => void): this
 */
const receivedPong = ({ shard, redis, connP }) => async () => {
  console.log('event received-pong')

  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'received-pong', data: null }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = receivedPong
