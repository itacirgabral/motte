const seals = require('../../seals')

const mkGroupParticipantsPromote = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsPromote])
})

module.exports = mkGroupParticipantsPromote
