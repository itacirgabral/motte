const seals = require('../../seals')

const mkClose = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.close])
})

module.exports = mkClose
