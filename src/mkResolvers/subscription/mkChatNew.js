const seals = require('../../seals')

const mkChatNew = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.chatNew])
})

module.exports = mkChatNew
