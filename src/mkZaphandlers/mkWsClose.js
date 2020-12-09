/**
 *  when the socket has closed
 * on (event: 'ws-close', listener: (err: {reason?: DisconnectReason | string}) => void): this
 */
const wsClose = ({ shard, redis, connP }) => async (err) => {
  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'ws-close', data: err }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = wsClose
