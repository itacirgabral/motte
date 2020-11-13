const mkCreateBatchDelivery = ({ pubsub, connP, redis }) => async (parent, { text, timestamp }, context, info) => {
  const status = 'planning'
  await redis.hset('batchDelivery', 'status', status, 'text', text, 'timestamp', timestamp)

  return JSON.stringify({ status, timestamp, text })
}

module.exports = mkCreateBatchDelivery
