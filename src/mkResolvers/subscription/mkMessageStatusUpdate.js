const seals = require('../../seals')

const mkMessageStatusUpdate = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.messageStatusUpdate])
})

module.exports = mkMessageStatusUpdate
