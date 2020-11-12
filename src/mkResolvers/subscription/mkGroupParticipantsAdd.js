const seals = require('../../seals')

const mkGroupParticipantsAdd = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsAdd])
})

module.exports = mkGroupParticipantsAdd
