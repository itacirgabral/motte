const seals = require('../../seals')

const mkGroupParticipantsPromote = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsPromote])
})

module.exports = mkGroupParticipantsPromote
