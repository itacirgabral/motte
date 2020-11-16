const seals = require('../seals')

/**
 * when a user's presence is updated
 * on (event: 'user-presence-update', listener: (update: PresenceUpdate) => void): this
 */
const userPresenceUpdate = ({ pubsub, redis, connP }) => update => {
  console.log('event user-presence-update')
  console.dir(update)

  pubsub.publish(seals.userPresenceUpdate, { userPresenceUpdate: JSON.stringify(update) })
}

module.exports = userPresenceUpdate
