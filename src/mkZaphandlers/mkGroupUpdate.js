const seals = require('../seals')

/**
 * when the group is updated
 * on (event: 'group-update', listener: (update: Partial<WAGroupMetadata> & {jid: string, actor?: string}) => void): this
 */
const groupUpdate = ({ pubsub, redis, connP }) => async (user) => {
  console.log('event group-update')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'group-update', data: user }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  pubsub.publish(seals.groupUpdate, { groupUpdate: JSON.stringify(user) })
}

module.exports = groupUpdate
