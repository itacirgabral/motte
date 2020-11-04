const seals = require('../../seals')

const mkGroupParticipantsAdd = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.groupParticipantsAdd])
})

module.exports = mkGroupParticipantsAdd
