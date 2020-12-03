/**
 * when multiple chats are updated (new message, updated message, deleted, pinned, etc)
 * on (event: 'chats-update', listener: (chats: WAChatUpdate[]) => void): this
 */
const chatsUpdate = ({ wsP, redis, connP }) => async (chats) => {
  console.log('event chats-update')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'chats-update', data: chats }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()

  const ws = await wsP
  ws.send(JSON.stringify({
    t: 7,
    d: {
      topic: 'chat',
      event: 'message',
      data: {
        username: 'zapguiado',
        body: JSON.stringify({ event: 'chats-update', data: chats })
      }
    }
  }))
}

module.exports = chatsUpdate
