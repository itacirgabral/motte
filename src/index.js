const { ApolloServer, PubSub, gql } = require('apollo-server')

const typeDefs = gql`
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
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }

  type Subscription {
    bookAdded: Book
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin'
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster'
  }
]

const seal = 'NEW_BOOK'
const pubsub = new PubSub()

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books
  },
  Mutation: {
    addBook: (parent, { title, author }, context, info) => {
      const book = { title, author }
      books.push(book)
      pubsub.publish(seal, { bookAdded: book })
      return book
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([seal])
    }
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers })

// The `listen` method launches a web server.
server.listen({
  host: '0.0.0.0',
  port: '4000'
}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
