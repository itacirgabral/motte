/**
 * when the connection has closed
 * on (event: 'close', listener: (err: {reason?: DisconnectReason | string, isReconnecting: boolean}) => void): this
 */
const close = ({ redis, connP }) => async (err) => {
  console.log('event close')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'close', data: err }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()
}

module.exports = close
