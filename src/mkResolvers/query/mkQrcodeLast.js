const mkQrcodeLast = ({ pubsub, connP, redis }) => (parent, args, context, info) => redis.get('qrcodeLast')

module.exports = mkQrcodeLast
