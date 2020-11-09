const seals = require('../seals')

/**
 * when participants are removed or leave from a group
 * on (event: 'group-participants-remove', listener: (update: {jid: string, participants: string[], actor?: string}) => void): this
 */
const groupParticipantsRemove = ({ pubsub, redis }) => update => {
  console.log('event group-participants-remove')
  console.dir(update)

  pubsub.publish(seals.groupParticipantsRemove, { groupParticipantsRemove: JSON.stringify(update) })
}

module.exports = groupParticipantsRemove
