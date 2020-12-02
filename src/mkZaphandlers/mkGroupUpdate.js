const seals = require('../seals')

/**
 * when the group is updated
 * on (event: 'group-update', listener: (update: Partial<WAGroupMetadata> & {jid: string, actor?: string}) => void): this
 */
const groupUpdate = ({ pubsub, redis, connP }) => user => {
  console.log('event group-update')

  pubsub.publish(seals.groupUpdate, { groupUpdate: JSON.stringify(user) })
}

module.exports = groupUpdate
