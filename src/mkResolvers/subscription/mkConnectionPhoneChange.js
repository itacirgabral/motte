const seals = require('../../seals')

const mkConnectionPhoneChange = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.connectionPhoneChange])
})

module.exports = mkConnectionPhoneChange
