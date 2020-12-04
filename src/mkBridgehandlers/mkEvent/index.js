const { MessageType } = require('@adiwajshing/baileys')

const mkEvent = ({ wsP, redis, connP }) => async (d) => {
  console.log('src/mkBridgehandlers/mkevent')
  console.log(JSON.stringify(d, null, 2))

  if (d?.topic === 'chat') {
    const [command, jid = ''] = d?.data?.username?.split(':')
    const [, szapnet] = jid.split('@')
    if (szapnet === 's.whatsapp.net') {
      const conn = await connP
      switch (command) {
        case 'enviarMensagemTexto':
          await conn.sendMessage(jid, d.data.body, MessageType.text)
          console.log(`to=${jid} msg=${d.data.body}`)
      }
    }
  }
}

module.exports = mkEvent

/*
{
  "topic": "chat",
  "event": "message",
  "data": {
    "username": "enviarMensagemTexto:556596910295@s.whatsapp.net",
    "body": "vai mensagem"
  }
}
*/