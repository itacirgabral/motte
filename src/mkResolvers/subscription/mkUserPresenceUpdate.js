const seals = require('../../seals')

const mkUserPresenceUpdate = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.userPresenceUpdate])
})

module.exports = mkUserPresenceUpdate
