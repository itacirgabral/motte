const seals = require('../../seals')

const mkGroupDescriptionUpdate = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupDescriptionUpdate])
})

module.exports = mkGroupDescriptionUpdate
