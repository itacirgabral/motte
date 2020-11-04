const { WAConnection } = require('@adiwajshing/baileys')
const fs = require('fs')
const path = require('path')

let creds
try {
  const pathname = path.join(__dirname, '..', 'creds', 'main.json')
  console.log(`trying get file ${pathname}`)
  creds = fs.readFileSync(pathname, 'utf8')
} catch {
  console.log('Fail getting the file')
}

const zapfield = async ({
  chatNew,
  chatUpdate,
  close,
  connecting,
  connectionPhoneChange,
  credentialsUpdated,
  groupDescriptionUpdate,
  groupParticipantsAdd,
  groupParticipantsDemote,
  groupParticipantsPromote,
  groupParticipantsRemove,
  groupSettingsUpdate,
  messageNew,
  messageStatusUpdate,
  messageUpdate,
  open,
  qr,
  userPresenceUpdate,
  userStatusUpdate,
  wsClose
}) => {
  const conn = new WAConnection()
  // conn.logger.level = 'debug'
  conn.connectOptions.waitForChats = false

  if (creds) {
    const authInfo = JSON.parse(creds)
    conn.loadAuthInfo(authInfo)
  }

  conn.on('chat-new', chatNew)
  conn.on('chat-update', chatUpdate)
  conn.on('close', close)
  conn.on('connecting', connecting)
  conn.on('connection-phone-change', connectionPhoneChange)
  conn.on('credentials-updated', credentialsUpdated)
  conn.on('group-description-update', groupDescriptionUpdate)
  conn.on('group-participants-add', groupParticipantsAdd)
  conn.on('group-participants-demote', groupParticipantsDemote)
  conn.on('group-participants-promote', groupParticipantsPromote)
  conn.on('group-participants-remove', groupParticipantsRemove)
  conn.on('group-settings-update', groupSettingsUpdate)
  conn.on('message-new', messageNew)
  conn.on('message-status-update', messageStatusUpdate)
  conn.on('message-update', messageUpdate)
  conn.on('open', open)
  conn.on('qr', qr)
  conn.on('user-presence-update', userPresenceUpdate)
  conn.on('user-status-update', userStatusUpdate)
  conn.on('ws-close', wsClose)

  return conn.connect()
}

module.exports = zapfield
