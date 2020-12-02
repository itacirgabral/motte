const { WAConnection } = require('@adiwajshing/baileys')

const zapland = async ({
  zaphandlers: {
    open,
    connecting,
    connectionValidated,
    close,
    wsClose,
    credentialsUpdated,
    qr,
    connectionPhoneChange,
    userStatusUpdate,
    chatNew,
    contactsReceived,
    chatsReceived,
    chatsUpdate,
    chatUpdate,
    messageStatusUpdate,
    groupParticipantsUpdate,
    groupUpdate,
    receivedPong
  },
  redis
}) => {
  const conn = new WAConnection()
  conn.logger.level = 'trace'

  const creds = await redis.get('creds')

  if (creds) {
    const authInfo = JSON.parse(creds)
    console.dir(authInfo)
    conn.loadAuthInfo(authInfo)
  }

  conn.on('open', open)
  conn.on('connecting', connecting)
  conn.on('connection-validated', connectionValidated)
  conn.on('close', close)
  conn.on('ws-close', wsClose)
  conn.on('credentials-updated', credentialsUpdated)
  conn.on('qr', qr)
  conn.on('connection-phone-change', connectionPhoneChange)
  conn.on('user-status-update', userStatusUpdate)
  conn.on('chat-new', chatNew)
  conn.on('contacts-received', contactsReceived)
  conn.on('chats-received', chatsReceived)
  conn.on('chats-update', chatsUpdate)
  conn.on('chat-update', chatUpdate)
  conn.on('message-status-update', messageStatusUpdate)
  conn.on('group-participants-update', groupParticipantsUpdate)
  conn.on('group-update', groupUpdate)
  conn.on('received-pong', receivedPong)

  await conn.connect()

  return conn
}

module.exports = zapland
