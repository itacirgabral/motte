const seals = require('../../seals')

const mkGroupParticipantsPromote = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsPromote])
})

module.exports = mkGroupParticipantsPromote
