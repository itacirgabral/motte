const qrcode = require('../QRcode')
const mkQrcode = require('./query/mkQrcode')

const mkCredentialsUpdated = require('./subscription/mkCredentialsUpdated')
const mkClose = require('./subscription/mkClose')
const mkQr = require('./subscription/mkQr')
const mkConnecting = require('./subscription/mkConnecting')
const mkConnectionPhoneChange = require('./subscription/mkConnectionPhoneChange')
const mkOpen = require('./subscription/mkOpen')
const mkWsClose = require('./subscription/mkWsClose')

const mkUserPresenceUpdate = require('./subscription/mkUserPresenceUpdate')
const mkUserStatusUpdate = require('./subscription/mkUserStatusUpdate')
const mkChatNew = require('./subscription/mkChatNew')
const mkChatUpdate = require('./subscription/mkChatUpdate')
const mkMessageNew = require('./subscription/mkMessageNew')
const mkMessageStatusUpdate = require('./subscription/mkMessageStatusUpdate')
const mkMessageUpdate = require('./subscription/mkMessageUpdate')

const mkGroupDescriptionUpdate = require('./subscription/mkGroupDescriptionUpdate')
const mkGroupParticipantsAdd = require('./subscription/mkGroupParticipantsAdd')
const mkGroupParticipantsDemote = require('./subscription/mkGroupParticipantsDemote')
const mkGroupParticipantsPromote = require('./subscription/mkGroupParticipantsPromote')
const mkGroupParticipantsRemove = require('./subscription/mkGroupParticipantsRemove')
const mkGroupSettingsUpdate = require('./subscription/mkGroupSettingsUpdate')

const mkContacts = require('./query/mkContacts')
const mkSendTextMessage = require('./mutation/mkSendTextMessage')

const mkSendQuotableMessage = require('./mutation/mkSendQuotableMessage')
const mkForwardMessage = require('./mutation/mkForwardMessage')

const mkCreateContactList = require('./mutation/mkCreateContactList')

const mkResolvers = ({ pubsub, connP, redis }) => ({
  Query: {
    qrcode: mkQrcode({ qrcode, pubsub, connP, redis }),
    contacts: mkContacts({ pubsub, connP, redis })
  },
  Mutation: {
    sendTextMessage: mkSendTextMessage({ pubsub, connP, redis }),
    sendQuotableMessage: mkSendQuotableMessage({ pubsub, connP, redis }),
    forwardMessage: mkForwardMessage({ pubsub, connP, redis }),
    createContactList: mkCreateContactList({ pubsub, connP, redis })
  },
  Subscription: {
    credentialsUpdated: mkCredentialsUpdated({ pubsub, connP, redis }),
    close: mkClose({ pubsub, connP, redis }),
    qr: mkQr({ pubsub, connP, redis }),
    connecting: mkConnecting({ pubsub, connP, redis }),
    connectionPhoneChange: mkConnectionPhoneChange({ pubsub, connP, redis }),
    open: mkOpen({ pubsub, connP, redis }),
    wsClose: mkWsClose({ pubsub, connP, redis }),
    userPresenceUpdate: mkUserPresenceUpdate({ pubsub, connP, redis }),
    userStatusUpdate: mkUserStatusUpdate({ pubsub, connP, redis }),
    chatNew: mkChatNew({ pubsub, connP, redis }),
    chatUpdate: mkChatUpdate({ pubsub, connP, redis }),
    messageNew: mkMessageNew({ pubsub, connP, redis }),
    messageStatusUpdate: mkMessageStatusUpdate({ pubsub, connP, redis }),
    messageUpdate: mkMessageUpdate({ pubsub, connP, redis }),
    groupDescriptionUpdate: mkGroupDescriptionUpdate({ pubsub, connP, redis }),
    groupParticipantsAdd: mkGroupParticipantsAdd({ pubsub, connP, redis }),
    groupParticipantsDemote: mkGroupParticipantsDemote({ pubsub, connP, redis }),
    groupParticipantsPromote: mkGroupParticipantsPromote({ pubsub, connP, redis }),
    groupParticipantsRemove: mkGroupParticipantsRemove({ pubsub, connP, redis }),
    groupSettingsUpdate: mkGroupSettingsUpdate({ pubsub, connP, redis })
  }
})

module.exports = mkResolvers
