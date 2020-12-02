const seals = require('../seals')

/**
 * when participants are added to a group
 * on (event: 'group-participants-update', listener: (update: {jid: string, participants: string[], actor?: string, action: WAParticipantAction}) => void): this
 */
const groupParticipantsUpdate = ({ pubsub, redis, connP }) => user => {
  console.log('event group-participants-update')

  pubsub.publish(seals.groupParticipantsUpdate, { groupParticipantsUpdate: JSON.stringify(user) })
}

module.exports = groupParticipantsUpdate
