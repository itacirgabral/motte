const seals = require('../../seals')

const mkMessageNew = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.messageNew])
})

module.exports = mkMessageNew
