const seals = require('../../seals')

const mkConnecting = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.connecting])
})

module.exports = mkConnecting
