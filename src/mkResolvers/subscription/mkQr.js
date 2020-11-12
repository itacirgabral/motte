const seals = require('../../seals')

const mkQr = ({ pubsub, connP, redis }) => ({
  subscribe: () => pubsub.asyncIterator([seals.qr])
})

module.exports = mkQr
