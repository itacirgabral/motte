const seals = require('../../seals')

const mkConnecting = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.connecting])
})

module.exports = mkConnecting
