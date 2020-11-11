const seals = require('../../seals')

const mkMessageStatusUpdate = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.messageStatusUpdate])
})

module.exports = mkMessageStatusUpdate
