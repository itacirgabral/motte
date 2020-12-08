/**
 * when a message's status is updated (deleted, delivered, read, sent etc.)
 * on (event: 'message-status-update', listener: (message: WAMessageStatusUpdate) => void): this
 */
const messageStatusUpdate = ({ redis, connP }) => async (message) => {
  console.log('event message-status-update')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'message-status-update', data: message }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()
}

module.exports = messageStatusUpdate
