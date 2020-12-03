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

module.exports = ({ wsP, redis, connP }) => ({
  chatNew: mkChatNew({ wsP, redis, connP }),
  chatUpdate: mkChatUpdate({ wsP, redis, connP }),
  chatsReceived: mkChatsReceived({ wsP, redis, connP }),
  chatsUpdate: mkChatsUpdate({ wsP, redis, connP }),
  close: mkClose({ wsP, redis, connP }),
  connecting: mkConnecting({ wsP, redis, connP }),
  connectionPhoneChange: mkConnectionPhoneChange({ wsP, redis, connP }),
  connectionValidated: mkConnectionValidated({ wsP, redis, connP }),
  contactsReceived: mkContactsReceived({ wsP, redis, connP }),
  credentialsUpdated: mkCredentialsUpdated({ wsP, redis, connP }),
  groupParticipantsUpdate: mkGroupParticipantsUpdate({ wsP, redis, connP }),
  groupUpdate: mkGroupUpdate({ wsP, redis, connP }),
  messageStatusUpdate: mkMessageStatusUpdate({ wsP, redis, connP }),
  open: mkOpen({ wsP, redis, connP }),
  qr: mkQr({ wsP, redis, connP }),
  receivedPong: mkReceivedPong({ wsP, redis, connP }),
  userStatusUpdate: mkUserStatusUpdate({ wsP, redis, connP }),
  wsClose: mkWsClose({ wsP, redis, connP })
})
