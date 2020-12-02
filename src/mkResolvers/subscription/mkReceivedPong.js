const seals = require('../../seals')

const mkReceivedPong = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.receivedPong])
})

module.exports = mkReceivedPong
