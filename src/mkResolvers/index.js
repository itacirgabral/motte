const mkContacts = require('./query/mkContacts')
const mkQrcodeLast = require('./query/mkQrcodeLast')

const mkCreateBatchDelivery = require('./mutation/mkCreateBatchDelivery')
const mkCreateContactBatch = require('./mutation/mkCreateContactBatch')
const mkForwardMessage = require('./mutation/mkForwardMessage')
const mkSendQuotableMessage = require('./mutation/mkSendQuotableMessage')
const mkSendTextMessage = require('./mutation/mkSendTextMessage')

const mkChatNew = require('./subscription/mkChatNew')
const mkChatUpdate = require('./subscription/mkChatUpdate')
const mkChatsUpdate = require('./subscription/mkChatsUpdate')
const mkClose = require('./subscription/mkClose')
const mkConnecting = require('./subscription/mkConnecting')
const mkConnectionPhoneChange = require('./subscription/mkConnectionPhoneChange')
const mkConnectionValidated = require('./subscription/mkConnectionValidated')
const mkCredentialsUpdated = require('./subscription/mkCredentialsUpdated')
const mkDispatchBatch = require('./subscription/mkDispatchBatch')
const mkGroupParticipantsUpdate = require('./subscription/mkGroupParticipantsUpdate')
const mkGroupUpdate = require('./subscription/mkGroupUpdate')
const mkMessageNew = require('./subscription/mkMessageNew')
const mkMessageStatusUpdate = require('./subscription/mkMessageStatusUpdate')
const mkMessageUpdate = require('./subscription/mkMessageUpdate')
const mkOpen = require('./subscription/mkOpen')
const mkQr = require('./subscription/mkQr')
const mkReceivedPong = require('./subscription/mkReceivedPong')
const mkUserPresenceUpdate = require('./subscription/mkUserPresenceUpdate')
const mkUserStatusUpdate = require('./subscription/mkUserStatusUpdate')
const mkWsClose = require('./subscription/mkWsClose')

const mkResolvers = ({ pubsub, connP, redis }) => ({
  Query: {
    contacts: mkContacts({ pubsub, connP, redis }),
    qrcodeLast: mkQrcodeLast({ pubsub, connP, redis })
  },
  Mutation: {
    createBatchDelivery: mkCreateBatchDelivery({ pubsub, connP, redis }),
    createContactBatch: mkCreateContactBatch({ pubsub, connP, redis }),
    forwardMessage: mkForwardMessage({ pubsub, connP, redis }),
    sendQuotableMessage: mkSendQuotableMessage({ pubsub, connP, redis }),
    sendTextMessage: mkSendTextMessage({ pubsub, connP, redis })
  },
  Subscription: {
    chatNew: mkChatNew({ pubsub, connP, redis }),
    chatUpdate: mkChatUpdate({ pubsub, connP, redis }),
    chatsUpdate: mkChatsUpdate({ pubsub, connP, redis }),
    close: mkClose({ pubsub, connP, redis }),
    connecting: mkConnecting({ pubsub, connP, redis }),
    connectionPhoneChange: mkConnectionPhoneChange({ pubsub, connP, redis }),
    connectionValidated: mkConnectionValidated({ pubsub, connP, redis }),
    credentialsUpdated: mkCredentialsUpdated({ pubsub, connP, redis }),
    dispatchBatch: mkDispatchBatch({ pubsub, connP, redis }),
    groupParticipantsUpdate: mkGroupParticipantsUpdate({ pubsub, connP, redis }),
    groupUpdate: mkGroupUpdate({ pubsub, connP, redis }),
    messageNew: mkMessageNew({ pubsub, connP, redis }),
    messageStatusUpdate: mkMessageStatusUpdate({ pubsub, connP, redis }),
    messageUpdate: mkMessageUpdate({ pubsub, connP, redis }),
    open: mkOpen({ pubsub, connP, redis }),
    qr: mkQr({ pubsub, connP, redis }),
    receivedPong: mkReceivedPong({ pubsub, connP, redis }),
    userPresenceUpdate: mkUserPresenceUpdate({ pubsub, connP, redis }),
    userStatusUpdate: mkUserStatusUpdate({ pubsub, connP, redis }),
    wsClose: mkWsClose({ pubsub, connP, redis })
  }
})

module.exports = mkResolvers
