/**
 * when the connection has opened successfully
 * on (event: 'open', listener: (result: WAOpenResult) => void): this
 */
const open = ({ wsP, redis, connP }) => async (result) => {
  console.log('event open')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'open', data: result }))
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
        body: JSON.stringify({ event: 'open', data: result })
      }
    }
  }))
}

module.exports = open
