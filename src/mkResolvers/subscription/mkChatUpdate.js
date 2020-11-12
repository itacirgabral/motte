const seals = require('../../seals')

const mkChatUpdate = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.chatUpdate])
})

module.exports = mkChatUpdate
