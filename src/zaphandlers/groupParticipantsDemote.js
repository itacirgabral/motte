/**
 * when participants are demoted in a group
 * on (event: 'group-participants-demote', listener: (update: {jid: string, participants: string[], actor?: string}) => void): this
 */
const groupParticipantsDemote = update => {
  console.log('event group-participants-demote')
  console.dir(update)
}

module.exports = groupParticipantsDemote
