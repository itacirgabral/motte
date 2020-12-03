/**
 * when the connection has been validated
 * on (event: 'connection-validated', listener: (user: WAUser) => void): this
 */
const connectionValidated = ({ wsP, redis, connP }) => async (user) => {
  console.log('event connection-validated')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'connection-validated', data: user }))
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
        body: JSON.stringify({ event: 'connection-validated', data: user })
      }
    }
  }))
}

module.exports = connectionValidated
