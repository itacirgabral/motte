
const mkCreateContactBatch = ({ pubsub, connP, redis }) => async (parent, { contacts }, context, info) => {
  const pipeline = redis.pipeline()

  pipeline.sadd('contactBatch', ...contacts)
  pipeline.sinterstore('contactBatch', 'contactBatch', 'contacts')
  pipeline.smembers('contactBatch')

  const [, , [, contactBatch]] = await pipeline.exec()

  return JSON.stringify(contactBatch)
}

module.exports = mkCreateContactBatch
