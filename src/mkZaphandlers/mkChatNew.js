/**
 * when a new chat is added
 * on (event: 'chat-new', listener: (chat: WAChat) => void): this
 */
const chatNew = ({ shard, redis, connP }) => async (chat) => {
  const logKey = `zap:${shard}:log`
  const contactsKey = `zap:${shard}:contacts`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'chat-new', data: chat }))
  pipeline.ltrim(logKey, 0, 99)

  if (chat.jid.split('@s.whatsapp.net').length === 2) {
    pipeline.sadd(contactsKey, chat.jid)
  }

  await pipeline.exec()
}

module.exports = chatNew
