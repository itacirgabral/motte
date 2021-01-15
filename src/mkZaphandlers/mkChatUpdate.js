/**
 *  when a chat is updated (new message, updated message, deleted, pinned, presence updated etc)
 * on (event: 'chat-update', listener: (chat: Partial<WAChat> & { jid: string }) => void): this
 */
const chatUpdate = ({ shard, redis, connP }) => {
  const logKey = `zap:${shard}:log`
  const newsKey = `zap:${shard}:news`

  return async (chat) => {
    const json = JSON.stringify({ event: 'chat-update', data: chat })
    const pipeline = redis.pipeline()
    pipeline.lpush(logKey, json)
    pipeline.ltrim(logKey, 0, 99)
    pipeline.publish(newsKey, json)
    await pipeline.exec()
  }
}

module.exports = chatUpdate
