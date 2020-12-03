const seals = require('../seals')

/**
 * when the connection to the phone changes
 * on (event: 'connection-phone-change', listener: (state: {connected: boolean}) => void): this
 */
const connectionPhoneChange = ({ pubsub, redis, connP }) => async (state) => {
  console.log('event connection-phone-change')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'connection-phone-change', data: state }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  pubsub.publish(seals.connectionPhoneChange, { connectionPhoneChange: JSON.stringify(state) })
}

module.exports = connectionPhoneChange
