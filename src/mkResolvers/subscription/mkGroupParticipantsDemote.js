const seals = require('../../seals')

const mkGroupParticipantsDemote = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsDemote])
})

module.exports = mkGroupParticipantsDemote
