const seals = require('../../seals')

const mkConnectionPhoneChange = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.connectionPhoneChange])
})

module.exports = mkConnectionPhoneChange
