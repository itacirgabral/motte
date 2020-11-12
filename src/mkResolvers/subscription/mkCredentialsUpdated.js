const seals = require('../../seals')

const mkCredentialsUpdated = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.credentialsUpdated])
})

module.exports = mkCredentialsUpdated
