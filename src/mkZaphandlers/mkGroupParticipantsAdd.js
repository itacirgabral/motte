/**
 * when participants are added to a group
 * on (event: 'group-participants-add', listener: (update: {jid: string, participants: string[], actor?: string}) => void): this
 */
const groupParticipantsAdd = ({ pubsub }) => update => {
  console.log('event group-participants-add')
  console.dir(update)
}

module.exports = groupParticipantsAdd
