const seals = require('../../seals')

const mkBookAdded = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.newBook])
})

module.exports = mkBookAdded
