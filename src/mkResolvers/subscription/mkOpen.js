const seals = require('../../seals')

const mkOpen = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.open])
})

module.exports = mkOpen
