const seals = require('../../seals')

const mkUserPresenceUpdate = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.userPresenceUpdate])
})

module.exports = mkUserPresenceUpdate
