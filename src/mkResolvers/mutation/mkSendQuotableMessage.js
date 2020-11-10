
const { MessageType } = require('@adiwajshing/baileys')
const isPendingP = require('../../isPendingP')

const mkSendQuotableMessage = ({ pubsub, connP }) => async (parent, { to, text, quotedId, quotedMessage }, context, info) => {
  const isPending = await isPendingP(connP)

  if (isPending) {
    return ''
  } else {
    const conn = await connP

    const quotableMessage = {
      key: {
        id: quotedId
      },
      message: {
        conversation: quotedMessage
      }
    }
    const id = `${to}@s.whatsapp.net`
    const response = await conn.sendMessage(id, text, MessageType.extendedText, { quoted: quotableMessage })

    return JSON.stringify(response)
  }
}

module.exports = mkSendQuotableMessage
