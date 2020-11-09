const seals = require('../seals')

/**
 * when participants are demoted in a group
 * on (event: 'group-participants-demote', listener: (update: {jid: string, participants: string[], actor?: string}) => void): this
 */
const groupParticipantsDemote = ({ pubsub, redis }) => update => {
  console.log('event group-participants-demote')
  console.dir(update)

  pubsub.publish(seals.groupParticipantsDemote, { groupParticipantsDemote: JSON.stringify(update) })
}

module.exports = groupParticipantsDemote
