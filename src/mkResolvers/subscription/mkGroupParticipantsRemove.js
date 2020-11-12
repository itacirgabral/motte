const seals = require('../../seals')

const mkGroupParticipantsRemove = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsRemove])
})

module.exports = mkGroupParticipantsRemove
