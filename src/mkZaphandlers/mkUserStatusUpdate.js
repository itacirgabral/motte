/**
 * when a user's status is updated
 * on (event: 'user-status-update', listener: (update: {jid: string, status?: string}) => void): this
 */
const userStatusUpdate = ({ shard, redis, connP }) => async (update) => {
  console.log('event user-status-update')

  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'user-status-update', data: update }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = userStatusUpdate
