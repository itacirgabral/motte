/**
 * when the connection has closed
 * on (event: 'close', listener: (err: {reason?: DisconnectReason | string, isReconnecting: boolean}) => void): this
 */
const close = ({ wsP, redis, connP }) => async (err) => {
  console.log('event close')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'close', data: err }))
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
        body: JSON.stringify({ event: 'close', data: err })
      }
    }
  }))
}

module.exports = close
