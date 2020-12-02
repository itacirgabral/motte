const seals = require('../../seals')

const mkGroupUpdate = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupUpdate])
})

module.exports = mkGroupUpdate
