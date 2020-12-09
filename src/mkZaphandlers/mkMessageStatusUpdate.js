/**
 * when a message's status is updated (deleted, delivered, read, sent etc.)
 * on (event: 'message-status-update', listener: (message: WAMessageStatusUpdate) => void): this
 */
const messageStatusUpdate = ({ shard, redis, connP }) => async (message) => {
  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'message-status-update', data: message }))
  pipeline.ltrim(logKey, 0, 99)
  await pipeline.exec()
}

module.exports = messageStatusUpdate
