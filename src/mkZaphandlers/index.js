const mkChatNew = require('./mkChatNew')
const mkChatUpdate = require('./mkChatUpdate')
const mkChatsReceived = require('./mkChatsReceived')
const mkChatsUpdate = require('./mkChatsUpdate')
const mkClose = require('./mkClose')
const mkConnecting = require('./mkConnecting')
const mkConnectionPhoneChange = require('./mkConnectionPhoneChange')
const mkConnectionValidated = require('./mkConnectionValidated')
const mkContactsReceived = require('./mkContactsReceived')
const mkCredentialsUpdated = require('./mkCredentialsUpdated')
const mkGroupParticipantsUpdate = require('./mkGroupParticipantsUpdate')
const mkGroupUpdate = require('./mkGroupUpdate')
const mkMessageStatusUpdate = require('./mkMessageStatusUpdate')
const mkOpen = require('./mkOpen')
const mkQr = require('./mkQr')
const mkReceivedPong = require('./mkReceivedPong')
const mkUserStatusUpdate = require('./mkUserStatusUpdate')
const mkWsClose = require('./mkWsClose')

module.exports = ({ redis, connP }) => ({
  chatNew: mkChatNew({ redis, connP }),
  chatUpdate: mkChatUpdate({ redis, connP }),
  chatsReceived: mkChatsReceived({ redis, connP }),
  chatsUpdate: mkChatsUpdate({ redis, connP }),
  close: mkClose({ redis, connP }),
  connecting: mkConnecting({ redis, connP }),
  connectionPhoneChange: mkConnectionPhoneChange({ redis, connP }),
  connectionValidated: mkConnectionValidated({ redis, connP }),
  contactsReceived: mkContactsReceived({ redis, connP }),
  credentialsUpdated: mkCredentialsUpdated({ redis, connP }),
  groupParticipantsUpdate: mkGroupParticipantsUpdate({ redis, connP }),
  groupUpdate: mkGroupUpdate({ redis, connP }),
  messageStatusUpdate: mkMessageStatusUpdate({ redis, connP }),
  open: mkOpen({ redis, connP }),
  qr: mkQr({ redis, connP }),
  receivedPong: mkReceivedPong({ redis, connP }),
  userStatusUpdate: mkUserStatusUpdate({ redis, connP }),
  wsClose: mkWsClose({ redis, connP })
})
