const seals = require('../../seals')

const mkGroupParticipantsDemote = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsDemote])
})

module.exports = mkGroupParticipantsDemote
