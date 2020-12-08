/**
 * when a new chat is added
 * on (event: 'chat-new', listener: (chat: WAChat) => void): this
 */
const chatNew = ({ redis, connP }) => async (chat) => {
  console.log('event chat-new')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'chat-new', data: chat }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()
}

module.exports = chatNew
