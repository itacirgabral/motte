const seals = require('../seals')

/**
 * when WA sends back a pong
 * on (event: 'received-pong', listener: () => void): this
 */
const receivedPong = ({ pubsub, redis, connP }) => async () => {
  console.log('event received-pong')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'received-pong', data: null }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  pubsub.publish(seals.receivedPong, { receivedPong: null })
}

module.exports = receivedPong
