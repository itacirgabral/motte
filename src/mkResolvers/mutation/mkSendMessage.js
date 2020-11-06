
const { MessageType } = require('@adiwajshing/baileys')
const isPendingP = require('../../isPendingP')

const mkSendMessage = ({ pubsub, connP }) => async (parent, { to, text }, context, info) => {
  const isPending = await isPendingP(connP)

  if (isPending) {
    return ''
  } else {
    const conn = await connP
    const id = `${to}@s.whatsapp.net`
    const message = await conn.sendMessage(id, text, MessageType.text)
    return JSON.stringify(message)
  }
}

module.exports = mkSendMessage
