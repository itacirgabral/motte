/*
** Fee-fi-fo-fum,
** I smell the blood of an Englishman,
** Be he alive, or be he dead
** I'll grind his bones to make my bread.
*/

const feefifofum = ({ placa = 'plutocharon851557', redis, connP }) => {
  let setTimeoutId = 0
  return {
    fifoMe: async ({ jid, msg }) => {
      const fifoBread = JSON.stringify({
        type: 'textMessage',
        jid,
        msg
      })
      console.log(fifoBread)
      await redis.lpush(`fifo:${placa}`, fifoBread)
    },
    startDrummer: async () => {
      // await conn.sendMessage(jid, d.data.body, MessageType.text)
      // const { MessageType } = require('@adiwajshing/baileys')
    }
  }
}

module.exports = feefifofum
