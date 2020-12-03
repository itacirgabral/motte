/**
 * when a user's status is updated
 * on (event: 'user-status-update', listener: (update: {jid: string, status?: string}) => void): this
 */
const userStatusUpdate = ({ wsP, redis, connP }) => async (update) => {
  console.log('event user-status-update')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'user-status-update', data: update }))
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
        body: JSON.stringify({ event: 'user-status-update', data: update })
      }
    }
  }))
}

module.exports = userStatusUpdate
