const seals = require('../../seals')

const mkChatNew = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.chatNew])
})

module.exports = mkChatNew
