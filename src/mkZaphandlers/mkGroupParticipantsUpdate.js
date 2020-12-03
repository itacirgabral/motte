/**
 * when participants are added to a group
 * on (event: 'group-participants-update', listener: (update: {jid: string, participants: string[], actor?: string, action: WAParticipantAction}) => void): this
 */
const groupParticipantsUpdate = ({ wsP, redis, connP }) => async (user) => {
  console.log('event group-participants-update')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'group-participants-update', data: user }))
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
        body: JSON.stringify({ event: 'group-participants-update', data: user })
      }
    }
  }))
}

module.exports = groupParticipantsUpdate
