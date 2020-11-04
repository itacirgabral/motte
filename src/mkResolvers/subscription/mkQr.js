const seals = require('../../seals')

const mkQr = ({ pubsub }) => ({
  subscribe: () => pubsub.asyncIterator([seals.qr])
})

module.exports = mkQr
