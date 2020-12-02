const seals = require('../../seals')

const mkGroupParticipantsUpdate = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsUpdate])
})

module.exports = mkGroupParticipantsUpdate
