
const { MessageType } = require('@adiwajshing/baileys')
const isPendingP = require('../../isPendingP')

const mkSendTextMessage = ({ pubsub, connP }) => async (parent, { to, text }, context, info) => {
  const isPending = await isPendingP(connP)

  if (isPending) {
    return ''
  } else {
    const conn = await connP
    const message = await conn.sendMessage(to, text, MessageType.text)
    return JSON.stringify(message)
  }
}

module.exports = mkSendTextMessage
