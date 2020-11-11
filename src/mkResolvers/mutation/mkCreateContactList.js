
const mkCreateContactList = ({ pubsub, connP, redis }) => async (parent, { contacts }, context, info) => {
  const pipeline = redis.pipeline()

  pipeline.sadd('contactList', ...contacts)
  pipeline.sinterstore('contactList', 'contactList', 'contacts')
  pipeline.smembers('contactList')

  const [, , [, contactList]] = await pipeline.exec()

  return JSON.stringify(contactList)
}

module.exports = mkCreateContactList
