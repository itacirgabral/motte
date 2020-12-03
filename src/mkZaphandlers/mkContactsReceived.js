const seals = require('../seals')

/**
 * when the contacts has received
 * on (event: 'contacts-received', listener: () => void): this
 */
const contactsReceived = ({ pubsub, redis, connP }) => async () => {
  console.log('event contacts-received')
  const conn = await connP

  const length = Object.keys(conn.contacts).length

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'contacts-received', data: null }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  pubsub.publish(seals.contactsReceived, { contactsReceived: length })
}

module.exports = contactsReceived
