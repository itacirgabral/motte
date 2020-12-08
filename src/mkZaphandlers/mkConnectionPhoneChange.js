/**
 * when the connection to the phone changes
 * on (event: 'connection-phone-change', listener: (state: {connected: boolean}) => void): this
 */
const connectionPhoneChange = ({ shard, redis, connP }) => async (state) => {
  console.log('event connection-phone-change')

  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'connection-phone-change', data: state }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = connectionPhoneChange
