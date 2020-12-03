const seals = require('../seals')

/**
 *  when the socket has closed
 * on (event: 'ws-close', listener: (err: {reason?: DisconnectReason | string}) => void): this
 */
const wsClose = ({ pubsub, redis, connP }) => async (err) => {
  console.log('event ws-close')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'ws-close', data: err }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  pubsub.publish(seals.wsClose, { wsClose: JSON.stringify(err) })
}

module.exports = wsClose
