const mkChatNew = require('./mkChatNew.js')
const mkChatsReceived = require('./mkChatsReceived')
const mkContactsReceived = require('./mkContactsReceived')
const mkConnectionPhoneChange = require('./mkConnectionPhoneChange.js')
const mkGroupParticipantsDemote = require('./mkGroupParticipantsDemote.js')
const mkQr = require('./mkQr.js')
const mkChatUpdate = require('./mkChatUpdate.js')
const mkCredentialsUpdated = require('./mkCredentialsUpdated.js')
const mkGroupParticipantsPromote = require('./mkGroupParticipantsPromote.js')
const mkMessageStatusUpdate = require('./mkMessageStatusUpdate.js')
const mkClose = require('./mkClose.js')
const mkGroupDescriptionUpdate = require('./mkGroupDescriptionUpdate.js')
const mkGroupParticipantsRemove = require('./mkGroupParticipantsRemove.js')
const mkUserStatusUpdate = require('./mkUserStatusUpdate.js')
const mkConnecting = require('./mkConnecting.js')
const mkGroupParticipantsAdd = require('./mkGroupParticipantsAdd.js')
const mkGroupSettingsUpdate = require('./mkGroupSettingsUpdate.js')
const mkOpen = require('./mkOpen.js')
const mkWsClose = require('./mkWsClose.js')

module.exports = ({ pubsub, redis, connP }) => ({
  chatNew: mkChatNew({ pubsub, redis, connP }),
  chatsReceived: mkChatsReceived({ pubsub, redis, connP }),
  connectionPhoneChange: mkConnectionPhoneChange({ pubsub, redis, connP }),
  contactsReceived: mkContactsReceived({ pubsub, redis, connP }),
  groupParticipantsDemote: mkGroupParticipantsDemote({ pubsub, redis, connP }),
  qr: mkQr({ pubsub, redis, connP }),
  chatUpdate: mkChatUpdate({ pubsub, redis, connP }),
  credentialsUpdated: mkCredentialsUpdated({ pubsub, redis, connP }),
  groupParticipantsPromote: mkGroupParticipantsPromote({ pubsub, redis, connP }),
  messageStatusUpdate: mkMessageStatusUpdate({ pubsub, redis, connP }),
  close: mkClose({ pubsub, redis, connP }),
  groupDescriptionUpdate: mkGroupDescriptionUpdate({ pubsub, redis, connP }),
  groupParticipantsRemove: mkGroupParticipantsRemove({ pubsub, redis, connP }),
  userStatusUpdate: mkUserStatusUpdate({ pubsub, redis, connP }),
  connecting: mkConnecting({ pubsub, redis, connP }),
  groupParticipantsAdd: mkGroupParticipantsAdd({ pubsub, redis, connP }),
  groupSettingsUpdate: mkGroupSettingsUpdate({ pubsub, redis, connP }),
  open: mkOpen({ pubsub, redis, connP }),
  wsClose: mkWsClose({ pubsub, redis, connP })
})
