const { WAConnection } = require('@adiwajshing/baileys')
const fs = require('fs')
const path = require('path')

const mkZaphandlers = require('./mkZaphandlers')

const {
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
} = mkZaphandlers({ pubsub })

let creds
try {
  creds = fs.readFileSync(path.join(__dirname, '..', 'creds', 'main.json'))
} catch {}

;(async () => {
  const conn = new WAConnection()
  conn.logger.level = 'debug'
  conn.connectOptions.waitForChats = false

  if (creds) {
    conn.loadAuthInfo(JSON.parse(creds))
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

  await conn.connect()
  if (!creds) {
    const authInfo = conn.base64EncodedAuthInfo()
    fs.writeFile(path.join(__dirname, '..', 'creds', 'main.json'), JSON.stringify(authInfo), () => {
      console.log('creds main.json')
    })
  }
})()
