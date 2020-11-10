const { gql } = require('apollo-server')

const typeDefs = gql`
  """
  Credentials are the wallet that store your WhatsApp Web sessions. 
  """
  type Credentials {
    clientID: String
    clientToken: String
    serverToken: String
    encKey: String
    macKey: String
  }

  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    qrcode: String
    contacts: [String]!
  }

  type Mutation {
    addBook(title: String  author: String): Book
    sendMessage(to: String text: String): String
    sendQuotableMessage(to: String, text: String, quotedId: String, quotedMessage: String): String
  }

  type Subscription {
    bookAdded: Book
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
  }
`

module.exports = typeDefs
