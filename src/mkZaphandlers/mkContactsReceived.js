/**
 * when the contacts has received
 * on (event: 'contacts-received', listener: () => void): this
 */
const contactsReceived = ({ shard, redis, connP }) => async () => {
  const logKey = `zap:${shard}:log`
  const newsKey = `zap:${shard}:news`
  const json = JSON.stringify({ event: 'contacts-received', data: null })
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, json)
  pipeline.ltrim(logKey, 0, 99)
  pipeline.publish(newsKey, json)
  await pipeline.exec()
}

module.exports = contactsReceived
