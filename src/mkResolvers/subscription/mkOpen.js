const seals = require('../../seals')

const mkOpen = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.open])
})

module.exports = mkOpen
