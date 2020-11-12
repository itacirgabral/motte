const seals = require('../../seals')

const mkUserStatusUpdate = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.userStatusUpdate])
})

module.exports = mkUserStatusUpdate
