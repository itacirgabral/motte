const seals = require('../../seals')

const mkGroupParticipantsRemove = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsRemove])
})

module.exports = mkGroupParticipantsRemove
