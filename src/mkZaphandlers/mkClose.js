/**
 * when the connection has closed
 * on (event: 'close', listener: (err: {reason?: DisconnectReason | string, isReconnecting: boolean}) => void): this
 */
const close = ({ shard, redis, connP }) => async (err) => {
  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'close', data: err }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = close
