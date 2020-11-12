const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    qrcode: String
    contacts: [String]!
  }

  type Mutation {
    sendTextMessage(to: String text: String): String
    sendQuotableMessage(to: String, text: String, quotedId: String, quotedMessage: String): String
    forwardMessage(to: String, fromMessageId: String, fromChatId: String, fromMessageText: String): String
    createContactList(contacts: [String]): String
    createBatchDelivery(text: String timestamp: String): String
  }

  type Subscription {
    chatNew: String
    chatUpdate: String
    close: String
    connecting: String
    connectionPhoneChange: String
    credentialsUpdated: String
    groupDescriptionUpdate: String
    groupParticipantsAdd: String
    groupParticipantsDemote: String
    groupParticipantsPromote: String
    groupParticipantsRemove: String
    groupSettingsUpdate: String
    messageNew: String
    messageStatusUpdate: String
    messageUpdate: String
    open: String
    qr: String
    userPresenceUpdate: String
    userStatusUpdate: String
    wsClose: String
    dispatchBatch(to: String): String
  }
`

module.exports = typeDefs
