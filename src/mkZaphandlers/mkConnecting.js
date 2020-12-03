const seals = require('../seals')

/**
 *  when the connection is opening
 * on (event: 'connecting', listener: () => void): this
 */
const connecting = ({ pubsub, redis, connP }) => async () => {
  console.log('event connecting')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'connecting', data: null }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  pubsub.publish(seals.connecting, { connecting: JSON.stringify(true) })
}

module.exports = connecting
