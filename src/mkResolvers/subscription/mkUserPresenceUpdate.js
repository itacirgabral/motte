const seals = require('../../seals')

const mkUserPresenceUpdate = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.userPresenceUpdate])
})

module.exports = mkUserPresenceUpdate
