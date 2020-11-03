const chatNew = require('chatNew.js')
const connectionPhoneChange = require('connectionPhoneChange.js')
const groupParticipantsDemote = require('groupParticipantsDemote.js')
const messageNew = require('messageNew.js')
const qr = require('qr.js')
const chatUpdate = require('chatUpdate.js')
const credentialsUpdated = require('credentialsUpdated.js')
const groupParticipantsPromote = require('groupParticipantsPromote.js')
const messageStatusUpdate = require('messageStatusUpdate.js')
const userPresenceUpdate = require('userPresenceUpdate.js')
const close = require('close.js')
const groupDescriptionUpdate = require('groupDescriptionUpdate.js')
const groupParticipantsRemove = require('groupParticipantsRemove.js')
const messageUpdate = require('messageUpdate.js')
const userStatusUpdate = require('userStatusUpdate.js')
const connecting = require('connecting.js')
const groupParticipantsAdd = require('groupParticipantsAdd.js')
const groupSettingsUpdate = require('groupSettingsUpdate.js')
const open = require('open.js')
const wsClose = require('wsClose.js')

module.exports = {
  chatNew,
  connectionPhoneChange,
  groupParticipantsDemote,
  messageNew,
  qr,
  chatUpdate,
  credentialsUpdated,
  groupParticipantsPromote,
  messageStatusUpdate,
  userPresenceUpdate,
  close,
  groupDescriptionUpdate,
  groupParticipantsRemove,
  messageUpdate,
  userStatusUpdate,
  connecting,
  groupParticipantsAdd,
  groupSettingsUpdate,
  open,
  wsClose
}
