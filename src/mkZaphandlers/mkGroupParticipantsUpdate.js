/**
 * when participants are added to a group
 * on (event: 'group-participants-update', listener: (update: {jid: string, participants: string[], actor?: string, action: WAParticipantAction}) => void): this
 */
const groupParticipantsUpdate = ({ shard, redis, connP }) => async (user) => {
  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'group-participants-update', data: user }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = groupParticipantsUpdate
