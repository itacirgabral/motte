const seals = require('../seals')

/**
 * when a user's status is updated
 * on (event: 'user-status-update', listener: (update: {jid: string, status?: string}) => void): this
 */
const userStatusUpdate = ({ pubsub, redis, connP }) => update => {
  console.log('event user-status-update')

  pubsub.publish(seals.userStatusUpdate, { userStatusUpdate: JSON.stringify(update) })
}

module.exports = userStatusUpdate
