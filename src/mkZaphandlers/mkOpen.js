const seals = require('../seals')

/**
 * when the connection has opened successfully
 * on (event: 'open', listener: (result: WAOpenResult) => void): this
 */
const open = ({ pubsub, redis, connP }) => async (result) => {
  console.log('event open')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'open', data: result }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  pubsub.publish(seals.open, { open: JSON.stringify(result) })
}

module.exports = open
