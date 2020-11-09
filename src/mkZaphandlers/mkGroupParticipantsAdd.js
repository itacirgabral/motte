const seals = require('../seals')

/**
 * when participants are added to a group
 * on (event: 'group-participants-add', listener: (update: {jid: string, participants: string[], actor?: string}) => void): this
 */
const groupParticipantsAdd = ({ pubsub, redis }) => update => {
  console.log('event group-participants-add')
  console.dir(update)

  pubsub.publish(seals.groupParticipantsAdd, { groupParticipantsAdd: JSON.stringify(update) })
}

module.exports = groupParticipantsAdd
