/**
 * when a user's presence is updated
 * on (event: 'user-presence-update', listener: (update: PresenceUpdate) => void): this
 */
const userPresenceUpdate = ({ pubsub }) => update => {
  console.log('event user-presence-update')
  console.dir(update)
}

module.exports = userPresenceUpdate
