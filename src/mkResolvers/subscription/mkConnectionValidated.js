const seals = require('../../seals')

const mkConnectionValidated = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.connectionValidated])
})

module.exports = mkConnectionValidated
