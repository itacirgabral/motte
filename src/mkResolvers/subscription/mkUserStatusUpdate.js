const seals = require('../../seals')

const mkUserStatusUpdate = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.userStatusUpdate])
})

module.exports = mkUserStatusUpdate
