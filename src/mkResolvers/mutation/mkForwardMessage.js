
const isPendingP = require('../../isPendingP')

const mkForwardMessage = ({ pubsub, connP, redis }) => async (parent, { to, fromMessageId, fromChatId, fromMessageText }, context, info) => {
  const isPending = await isPendingP(connP)

  if (isPending) {
    return ''
  } else {
    console.log('mkForwardMessage')

    const conn = await connP

    const message = {
      key: {
        remoteJid: fromChatId,
        id: fromMessageId
      },
      message: {
        conversation: fromMessageText
      }
    }

    const response = await conn.forwardMessage(to, message)
    return JSON.stringify(response)
  }
}

module.exports = mkForwardMessage