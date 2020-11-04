const seals = require('../../seals')

const mkUserStatusUpdate = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.userStatusUpdate])
})

module.exports = mkUserStatusUpdate
