const seals = require('../../seals')

const mkWsClose = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.close])
})

module.exports = mkWsClose
