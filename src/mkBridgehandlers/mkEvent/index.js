const mkEvent = ({ wsP, redis, connP, fifomeP }) => async (d) => {
  console.log('src/mkBridgehandlers/mkevent')
  console.log(JSON.stringify(d, null, 2))

  if (d?.topic === 'chat') {
    const [command, jid = ''] = d?.data?.username?.split(':')
    const [, szapnet] = jid.split('@')
    if (szapnet === 's.whatsapp.net') {
      const fifome = await fifomeP
      switch (command) {
        case 'enviarMensagemTexto':
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