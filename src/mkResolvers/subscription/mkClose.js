const seals = require('../../seals')

const mkClose = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.close])
})

module.exports = mkClose
