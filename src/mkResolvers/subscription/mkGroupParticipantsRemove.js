const seals = require('../../seals')

const mkGroupParticipantsRemove = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsRemove])
})

module.exports = mkGroupParticipantsRemove
