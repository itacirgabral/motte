const seals = require('../../seals')

const mkChatUpdate = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.chatUpdate])
})

module.exports = mkChatUpdate
