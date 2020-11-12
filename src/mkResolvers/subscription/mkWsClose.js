const seals = require('../../seals')

const mkWsClose = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.close])
})

module.exports = mkWsClose
