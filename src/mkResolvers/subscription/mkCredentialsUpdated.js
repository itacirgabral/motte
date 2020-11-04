const seals = require('../../seals')

const mkCredentialsUpdated = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.credentialsUpdated])
})

module.exports = mkCredentialsUpdated
