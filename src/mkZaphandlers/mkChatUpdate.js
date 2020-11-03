/**
 * when a chat is updated (archived, deleted, pinned)
 * on (event: 'chat-update', listener: (chat: Partial<WAChat> & { jid: string }) => void): this
 */
const chatUpdate = ({ pubsub }) => chat => {
  console.log('event chat-update')
  console.dir(chat)
}

module.exports = chatUpdate
