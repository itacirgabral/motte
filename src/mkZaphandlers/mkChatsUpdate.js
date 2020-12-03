const seals = require('../seals')

/**
 * when multiple chats are updated (new message, updated message, deleted, pinned, etc)
 * on (event: 'chats-update', listener: (chats: WAChatUpdate[]) => void): this
 */
const chatsUpdate = ({ pubsub, redis, connP }) => async (chats) => {
  console.log('event chats-update')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'chats-update', data: chats }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  pubsub.publish(seals.chatsUpdate, { chatsUpdate: JSON.stringify(chats) })
}

module.exports = chatsUpdate
