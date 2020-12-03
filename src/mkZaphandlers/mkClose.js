const seals = require('../seals')

/**
 * when the connection has closed
 * on (event: 'close', listener: (err: {reason?: DisconnectReason | string, isReconnecting: boolean}) => void): this
 */
const close = ({ pubsub, redis, connP }) => async (err) => {
  console.log('event close')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'close', data: err }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  pubsub.publish(seals.close, { close: JSON.stringify(err) })
}

module.exports = close
