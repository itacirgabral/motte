/**
 *  when the socket has closed
 * on (event: 'ws-close', listener: (err: {reason?: DisconnectReason | string}) => void): this
 */
const wsClose = ({ wsP, redis, connP }) => async (err) => {
  console.log('event ws-close')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'ws-close', data: err }))
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
        body: JSON.stringify({ event: 'ws-close', data: err })
      }
    }
  }))
}

module.exports = wsClose
