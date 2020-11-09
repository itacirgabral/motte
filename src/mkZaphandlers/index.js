const mkChatNew = require('./mkChatNew.js')
const mkConnectionPhoneChange = require('./mkConnectionPhoneChange.js')
const mkGroupParticipantsDemote = require('./mkGroupParticipantsDemote.js')
const mkMessageNew = require('./mkMessageNew.js')
const mkQr = require('./mkQr.js')
const mkChatUpdate = require('./mkChatUpdate.js')
const mkCredentialsUpdated = require('./mkCredentialsUpdated.js')
const mkGroupParticipantsPromote = require('./mkGroupParticipantsPromote.js')
const mkMessageStatusUpdate = require('./mkMessageStatusUpdate.js')
const mkUserPresenceUpdate = require('./mkUserPresenceUpdate.js')
const mkClose = require('./mkClose.js')
const mkGroupDescriptionUpdate = require('./mkGroupDescriptionUpdate.js')
const mkGroupParticipantsRemove = require('./mkGroupParticipantsRemove.js')
const mkMessageUpdate = require('./mkMessageUpdate.js')
const mkUserStatusUpdate = require('./mkUserStatusUpdate.js')
const mkConnecting = require('./mkConnecting.js')
const mkGroupParticipantsAdd = require('./mkGroupParticipantsAdd.js')
const mkGroupSettingsUpdate = require('./mkGroupSettingsUpdate.js')
const mkOpen = require('./mkOpen.js')
const mkWsClose = require('./mkWsClose.js')

module.exports = ({ pubsub, redis }) => ({
  chatNew: mkChatNew({ pubsub, redis }),
  connectionPhoneChange: mkConnectionPhoneChange({ pubsub, redis }),
  groupParticipantsDemote: mkGroupParticipantsDemote({ pubsub, redis }),
  messageNew: mkMessageNew({ pubsub, redis }),
  qr: mkQr({ pubsub, redis }),
  chatUpdate: mkChatUpdate({ pubsub, redis }),
  credentialsUpdated: mkCredentialsUpdated({ pubsub, redis }),
  groupParticipantsPromote: mkGroupParticipantsPromote({ pubsub, redis }),
  messageStatusUpdate: mkMessageStatusUpdate({ pubsub, redis }),
  userPresenceUpdate: mkUserPresenceUpdate({ pubsub, redis }),
  close: mkClose({ pubsub, redis }),
  groupDescriptionUpdate: mkGroupDescriptionUpdate({ pubsub, redis }),
  groupParticipantsRemove: mkGroupParticipantsRemove({ pubsub, redis }),
  messageUpdate: mkMessageUpdate({ pubsub, redis }),
  userStatusUpdate: mkUserStatusUpdate({ pubsub, redis }),
  connecting: mkConnecting({ pubsub, redis }),
  groupParticipantsAdd: mkGroupParticipantsAdd({ pubsub, redis }),
  groupSettingsUpdate: mkGroupSettingsUpdate({ pubsub, redis }),
  open: mkOpen({ pubsub, redis }),
  wsClose: mkWsClose({ pubsub, redis })
})
