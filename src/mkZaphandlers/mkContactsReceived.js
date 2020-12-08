/**
 * when the contacts has received
 * on (event: 'contacts-received', listener: () => void): this
 */
const contactsReceived = ({ shard, redis, connP }) => async () => {
  console.log('event contacts-received')

  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'contacts-received', data: null }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = contactsReceived
