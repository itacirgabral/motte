/**
 * when participants are added to a group
 * on (event: 'group-participants-update', listener: (update: {jid: string, participants: string[], actor?: string, action: WAParticipantAction}) => void): this
 */
const groupParticipantsUpdate = ({ shard, redis, connP }) => async (user) => {
  const logKey = `zap:${shard}:log`
  const newsKey = `zap:${shard}:news`
  const json = JSON.stringify({ event: 'group-participants-update', data: user })
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, json)
  pipeline.ltrim(logKey, 0, 99)
  pipeline.publish(newsKey, json)
  await pipeline.exec()
}

module.exports = groupParticipantsUpdate
