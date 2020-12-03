/**
 *  when the connection is opening
 * on (event: 'connecting', listener: () => void): this
 */
const connecting = ({ wsP, redis, connP }) => async () => {
  console.log('event connecting')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'connecting', data: null }))
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
        body: JSON.stringify({ event: 'connecting', data: null })
      }
    }
  }))
}

module.exports = connecting
