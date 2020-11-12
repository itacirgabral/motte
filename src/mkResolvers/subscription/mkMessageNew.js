const seals = require('../../seals')

const mkMessageNew = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.messageNew])
})

module.exports = mkMessageNew
