/**
 * when a new chat is added
 * on (event: 'chat-new', listener: (chat: WAChat) => void): this
 */
const chatNew = ({ shard, redis, connP }) => async (chat) => {
  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'chat-new', data: chat }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = chatNew
