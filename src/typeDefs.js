const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    qrcodeLast: String
    contacts: [String]!
  }

  type Mutation {
    sendTextMessage(to: String text: String): String
    sendQuotableMessage(to: String, text: String, quotedId: String, quotedMessage: String): String
    forwardMessage(to: String, fromMessageId: String, fromChatId: String, fromMessageText: String): String
    createContactBatch(contacts: [String]): String
    createBatchDelivery(text: String timestamp: String): String
  }

  type Subscription {
    chatNew: String
    chatUpdate: String
    chatsUpdate: String
    close: String
    connecting: String
    connectionPhoneChange: String
    connectionValidated: String
    credentialsUpdated: String
    dispatchBatch: String
    groupParticipantsUpdate: String
    groupUpdate: String
    messageNew: String
    messageStatusUpdate: String
    messageUpdate: String
    open: String
    qr: String
    receivedPong: String
    userPresenceUpdate: String
    userStatusUpdate: String
    wsClose: String
  }
`

module.exports = typeDefs
