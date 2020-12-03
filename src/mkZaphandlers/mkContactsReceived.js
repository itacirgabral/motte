/**
 * when the contacts has received
 * on (event: 'contacts-received', listener: () => void): this
 */
const contactsReceived = ({ wsP, redis, connP }) => async () => {
  console.log('event contacts-received')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'contacts-received', data: null }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  const ws = await wsP
  ws.send(JSON.stringify({
    t: 7,
    d: {
      topic: 'chat',
      event: 'message',
      data: {
        username: 'zapguiado',
        body: JSON.stringify({ event: 'contacts-received', data: null })
      }
    }
  }))
}

module.exports = contactsReceived
