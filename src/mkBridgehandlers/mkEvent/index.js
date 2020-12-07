 
const { MessageType } = require('@adiwajshing/baileys')

const mkEvent = ({ wsP, redis, connP, fifomeP }) => async (d) => {
  if (d?.topic === 'chat') {
    const [command, jid = ''] = d?.data?.username?.split(':')
    const [, szapnet] = jid.split('@')
    if (szapnet === 's.whatsapp.net') {
      const fifome = await fifomeP
      // const conn = await connP
      switch (command) {
        case 'enviarMensagemTexto':
          /*
          ** Toda mensagem e' colocada na fila de envio
          ** o drummer se encarrega de enviar no ritmo
          ** aqui nos recebemos pelo chat do adonis a
          ** ondem de enviar outra mensagem
          */
          await fifome({ jid, msg: d.data.body })
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