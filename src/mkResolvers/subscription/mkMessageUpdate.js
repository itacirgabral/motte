const seals = require('../../seals')

const mkMessageUpdate = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.messageUpdate])
})

module.exports = mkMessageUpdate
