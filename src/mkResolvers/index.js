const books = require('../books')
const mkBooks = require('./query/mkBooks')
const mkAddBook = require('./mutation/mkAddBook')
const mkBookAdded = require('./subscription/mkBookAdded')

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

const mkResolvers = ({ pubsub, connP }) => ({
  Query: {
    books: mkBooks({ books, pubsub, connP }),
    qrcode: mkQrcode({ qrcode, pubsub, connP }),
    contacts: mkContacts({ pubsub, connP })
  },
  Mutation: {
    addBook: mkAddBook({ books, pubsub, connP }),
    sendTextMessage: mkSendTextMessage({ pubsub, connP }),
    sendQuotableMessage: mkSendQuotableMessage({ pubsub, connP })
  },
  Subscription: {
    bookAdded: mkBookAdded({ pubsub, connP }),
    credentialsUpdated: mkCredentialsUpdated({ pubsub, connP }),
    close: mkClose({ pubsub, connP }),
    qr: mkQr({ pubsub, connP }),
    connecting: mkConnecting({ pubsub, connP }),
    connectionPhoneChange: mkConnectionPhoneChange({ pubsub, connP }),
    open: mkOpen({ pubsub, connP }),
    wsClose: mkWsClose({ pubsub, connP }),
    userPresenceUpdate: mkUserPresenceUpdate({ pubsub, connP }),
    userStatusUpdate: mkUserStatusUpdate({ pubsub, connP }),
    chatNew: mkChatNew({ pubsub, connP }),
    chatUpdate: mkChatUpdate({ pubsub, connP }),
    messageNew: mkMessageNew({ pubsub, connP }),
    messageStatusUpdate: mkMessageStatusUpdate({ pubsub, connP }),
    messageUpdate: mkMessageUpdate({ pubsub, connP }),
    groupDescriptionUpdate: mkGroupDescriptionUpdate({ pubsub, connP }),
    groupParticipantsAdd: mkGroupParticipantsAdd({ pubsub, connP }),
    groupParticipantsDemote: mkGroupParticipantsDemote({ pubsub, connP }),
    groupParticipantsPromote: mkGroupParticipantsPromote({ pubsub, connP }),
    groupParticipantsRemove: mkGroupParticipantsRemove({ pubsub, connP }),
    groupSettingsUpdate: mkGroupSettingsUpdate({ pubsub, connP })
  }
})

module.exports = mkResolvers
