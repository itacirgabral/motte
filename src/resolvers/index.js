const { PubSub } = require('apollo-server')

const books = require('../books')
const mkBooks = require('./query/mkBooks')
const mkAddBook = require('./mutation/mkAddBook')
const mkBookAdded = require('./subscription/mkBookAdded')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    books: mkBooks({ books })
  },
  Mutation: {
    addBook: mkAddBook({ books, pubsub })
  },
  Subscription: {
    bookAdded: mkBookAdded({ pubsub })
  }
}

module.exports = resolvers
