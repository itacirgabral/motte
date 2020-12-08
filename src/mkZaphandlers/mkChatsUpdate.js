/**
 * when multiple chats are updated (new message, updated message, deleted, pinned, etc)
 * on (event: 'chats-update', listener: (chats: WAChatUpdate[]) => void): this
 */
const chatsUpdate = ({ shard, redis, connP }) => async (chats) => {
  console.log('event chats-update')

  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'chats-update', data: chats }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = chatsUpdate
