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
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }

  type Subscription {
    bookAdded: Book
    credentialsUpdated: String
  }
`

module.exports = typeDefs
