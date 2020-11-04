const seals = require('../../seals')

const mkConnectionPhoneChange = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.connectionPhoneChange])
})

module.exports = mkConnectionPhoneChange
