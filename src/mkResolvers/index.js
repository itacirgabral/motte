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

const mkResolvers = ({ pubsub }) => ({
  Query: {
    books: mkBooks({ books }),
    qrcode: mkQrcode({ qrcode })
  },
  Mutation: {
    addBook: mkAddBook({ books, pubsub })
  },
  Subscription: {
    bookAdded: mkBookAdded({ pubsub }),
    credentialsUpdated: mkCredentialsUpdated({ pubsub }),
    close: mkClose({ pubsub }),
    qr: mkQr({ pubsub }),
    connecting: mkConnecting({ pubsub }),
    connectionPhoneChange: mkConnectionPhoneChange({ pubsub }),
    open: mkOpen({ pubsub }),
    wsClose: mkWsClose({ pubsub }),
    userPresenceUpdate: mkUserPresenceUpdate({ pubsub }),
    userStatusUpdate: mkUserStatusUpdate({ pubsub }),
    chatNew: mkChatNew({ pubsub }),
    chatUpdate: mkChatUpdate({ pubsub }),
    messageNew: mkMessageNew({ pubsub }),
    messageStatusUpdate: mkMessageStatusUpdate({ pubsub }),
    messageUpdate: mkMessageUpdate({ pubsub }),
    groupDescriptionUpdate: mkGroupDescriptionUpdate({ pubsub }),
    groupParticipantsAdd: mkGroupParticipantsAdd({ pubsub }),
    groupParticipantsDemote: mkGroupParticipantsDemote({ pubsub }),
    groupParticipantsPromote: mkGroupParticipantsPromote({ pubsub }),
    groupParticipantsRemove: mkGroupParticipantsRemove({ pubsub }),
    groupSettingsUpdate: mkGroupSettingsUpdate({ pubsub })
  }
})

module.exports = mkResolvers
