const seals = require('../seals')

/**
 * when participants are promoted in a group
 * on (event: 'group-participants-promote', listener: (update: {jid: string, participants: string[], actor?: string}) => void): this
 */
const groupParticipantsPromote = ({ pubsub }) => update => {
  console.log('event group-participants-promote')
  console.dir(update)

  pubsub.publish(seals.groupParticipantsPromote, { groupParticipantsPromote: JSON.stringify(update) })
}

module.exports = groupParticipantsPromote
