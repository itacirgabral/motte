const seals = require('../../seals')

const mkChatUpdate = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.chatUpdate])
})

module.exports = mkChatUpdate
