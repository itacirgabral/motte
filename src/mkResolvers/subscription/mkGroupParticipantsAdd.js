const seals = require('../../seals')

const mkGroupParticipantsAdd = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsAdd])
})

module.exports = mkGroupParticipantsAdd
