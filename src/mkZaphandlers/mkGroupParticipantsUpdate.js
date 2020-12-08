/**
 * when participants are added to a group
 * on (event: 'group-participants-update', listener: (update: {jid: string, participants: string[], actor?: string, action: WAParticipantAction}) => void): this
 */
const groupParticipantsUpdate = ({ redis, connP }) => async (user) => {
  console.log('event group-participants-update')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'group-participants-update', data: user }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()
}

module.exports = groupParticipantsUpdate
