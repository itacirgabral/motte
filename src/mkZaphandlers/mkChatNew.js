const seals = require('../seals')

/**
 * when a new chat is added
 * on (event: 'chat-new', listener: (chat: WAChat) => void): this
 */
const chatNew = ({ pubsub, redis, connP }) => async (chat) => {
  console.log('event chat-new')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'chat-new', data: chat }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  pubsub.publish(seals.chatNew, { chatNew: JSON.stringify(chat) })
}

module.exports = chatNew
