/**
 * when participants are removed or leave from a group
 * on (event: 'group-participants-remove', listener: (update: {jid: string, participants: string[], actor?: string}) => void): this
 */
const groupParticipantsRemove = ({ pubsub }) => update => {
  console.log('event group-participants-remove')
  console.dir(update)
}

module.exports = groupParticipantsRemove
