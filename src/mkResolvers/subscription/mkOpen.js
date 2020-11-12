const seals = require('../../seals')

const mkOpen = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.open])
})

module.exports = mkOpen
