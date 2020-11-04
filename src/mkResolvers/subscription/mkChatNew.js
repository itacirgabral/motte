const seals = require('../../seals')

const mkChatNew = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.chatNew])
})

module.exports = mkChatNew
