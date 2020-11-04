const seals = require('../../seals')

const mkMessageNew = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.messageNew])
})

module.exports = mkMessageNew
