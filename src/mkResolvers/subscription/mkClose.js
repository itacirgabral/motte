const seals = require('../../seals')

const mkClose = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.close])
})

module.exports = mkClose
