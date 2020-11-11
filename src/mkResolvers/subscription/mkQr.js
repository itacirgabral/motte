const seals = require('../../seals')

const mkQr = ({ pubsub, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.qr])
})

module.exports = mkQr
