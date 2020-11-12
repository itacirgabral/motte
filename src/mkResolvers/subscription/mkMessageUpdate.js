const seals = require('../../seals')

const mkMessageUpdate = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.messageUpdate])
})

module.exports = mkMessageUpdate
