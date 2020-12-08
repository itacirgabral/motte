/**
 * when the contacts has received
 * on (event: 'contacts-received', listener: () => void): this
 */
const contactsReceived = ({ redis, connP }) => async () => {
  console.log('event contacts-received')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'contacts-received', data: null }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()
}

module.exports = contactsReceived
