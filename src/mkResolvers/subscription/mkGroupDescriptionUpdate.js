const seals = require('../../seals')

const mkGroupDescriptionUpdate = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupDescriptionUpdate])
})

module.exports = mkGroupDescriptionUpdate
