/**
 * when a user's status is updated
 * on (event: 'user-status-update', listener: (update: {jid: string, status?: string}) => void): this
 */
const userStatusUpdate = ({ redis, connP }) => async (update) => {
  console.log('event user-status-update')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'user-status-update', data: update }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()
}

module.exports = userStatusUpdate
