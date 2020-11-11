const seals = require('../../seals')

const mkGroupParticipantsDemote = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsDemote])
})

module.exports = mkGroupParticipantsDemote
