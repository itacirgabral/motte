const seals = require('../../seals')

const mkMessageStatusUpdate = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.messageStatusUpdate])
})

module.exports = mkMessageStatusUpdate
