const seals = require('../../seals')

const mkGroupDescriptionUpdate = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupDescriptionUpdate])
})

module.exports = mkGroupDescriptionUpdate
