const seals = require('../../seals')

const mkWsClose = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.close])
})

module.exports = mkWsClose
