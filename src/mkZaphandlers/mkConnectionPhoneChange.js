/**
 * when the connection to the phone changes
 * on (event: 'connection-phone-change', listener: (state: {connected: boolean}) => void): this
 */
const connectionPhoneChange = ({ wsP, redis, connP }) => async (state) => {
  console.log('event connection-phone-change')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'connection-phone-change', data: state }))
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
        body: JSON.stringify({ event: 'connection-phone-change', data: state })
      }
    }
  }))
}

module.exports = connectionPhoneChange
