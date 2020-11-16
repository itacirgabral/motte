const seals = require('../seals')

/**
 * when the group description is updated
 * on (event: 'group-description-update', listener: (update: {jid: string, description?: string, actor?: string}) => void): this
 */
const groupDescriptionUpdate = ({ pubsub, redis, connP }) => update => {
  console.log('event group-description-update')
  console.dir(update)

  pubsub.publish(seals.groupDescriptionUpdate, { groupDescriptionUpdate: JSON.stringify(update) })
}

module.exports = groupDescriptionUpdate
