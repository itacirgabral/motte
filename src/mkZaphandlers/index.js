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

module.exports = ({ pubsub, redis, connP }) => ({
  chatNew: mkChatNew({ pubsub, redis, connP }),
  chatUpdate: mkChatUpdate({ pubsub, redis, connP }),
  chatsReceived: mkChatsReceived({ pubsub, redis, connP }),
  chatsUpdate: mkChatsUpdate({ pubsub, redis, connP }),
  close: mkClose({ pubsub, redis, connP }),
  connecting: mkConnecting({ pubsub, redis, connP }),
  connectionPhoneChange: mkConnectionPhoneChange({ pubsub, redis, connP }),
  connectionValidated: mkConnectionValidated({ pubsub, redis, connP }),
  contactsReceived: mkContactsReceived({ pubsub, redis, connP }),
  credentialsUpdated: mkCredentialsUpdated({ pubsub, redis, connP }),
  groupParticipantsUpdate: mkGroupParticipantsUpdate({ pubsub, redis, connP }),
  groupUpdate: mkGroupUpdate({ pubsub, redis, connP }),
  messageStatusUpdate: mkMessageStatusUpdate({ pubsub, redis, connP }),
  open: mkOpen({ pubsub, redis, connP }),
  qr: mkQr({ pubsub, redis, connP }),
  receivedPong: mkReceivedPong({ pubsub, redis, connP }),
  userStatusUpdate: mkUserStatusUpdate({ pubsub, redis, connP }),
  wsClose: mkWsClose({ pubsub, redis, connP })
})
