const seals = require('../../seals')

const mkMessageUpdate = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.messageUpdate])
})

module.exports = mkMessageUpdate
