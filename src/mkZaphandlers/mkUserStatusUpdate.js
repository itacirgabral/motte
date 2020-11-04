const seals = require('../seals')

/**
 * when a user's status is updated
 * on (event: 'user-status-update', listener: (update: {jid: string, status?: string}) => void): this
 */
const userStatusUpdate = ({ pubsub }) => update => {
  console.log('event user-status-update')
  console.dir(update)

  pubsub.publish(seals.userStatusUpdate, { userStatusUpdate: JSON.stringify(update) })
}

module.exports = userStatusUpdate
