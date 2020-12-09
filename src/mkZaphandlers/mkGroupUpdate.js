/**
 * when the group is updated
 * on (event: 'group-update', listener: (update: Partial<WAGroupMetadata> & {jid: string, actor?: string}) => void): this
 */
const groupUpdate = ({ shard, redis, connP }) => async (user) => {
  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'group-update', data: user }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = groupUpdate
