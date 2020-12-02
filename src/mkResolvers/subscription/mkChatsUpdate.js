const seals = require('../../seals')

const mkChatsUpdate = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.chatsUpdate])
})

module.exports = mkChatsUpdate
