/**
 * when WA sends back a pong
 * on (event: 'received-pong', listener: () => void): this
 */
const receivedPong = ({ wsP, redis, connP }) => async () => {
  console.log('event received-pong')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'received-pong', data: null }))
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
        body: JSON.stringify({ event: 'received-pong', data: null })
      }
    }
  }))
}

module.exports = receivedPong
