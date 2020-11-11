const seals = require('../../seals')

const mkConnecting = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.connecting])
})

module.exports = mkConnecting
