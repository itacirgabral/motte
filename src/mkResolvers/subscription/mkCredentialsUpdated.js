const seals = require('../../seals')

const mkCredentialsUpdated = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.credentialsUpdated])
})

module.exports = mkCredentialsUpdated
