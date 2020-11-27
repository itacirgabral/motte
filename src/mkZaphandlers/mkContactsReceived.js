const seals = require('../seals')

/**
 * when the contacts has received
 * on (event: 'contacts-received', listener: () => void): this
 */
const contactsReceived = ({ pubsub, redis, connP }) => async () => {
  console.log('event contacts-received')
  const conn = await connP

  const length = conn.contacts.array.length
  console.log(`${length} contacts`)

  pubsub.publish(seals.contactsReceived, { length })
}

module.exports = contactsReceived
