const { PubSub } = require('apollo-server')

const books = require('../books')
const mkBooks = require('./query/mkBooks')
const mkAddBook = require('./mutation/mkAddBook')
const mkBookAdded = require('./subscription/mkBookAdded')

const qrcode = require('../QRcode')
const mkQrcode = require('./query/mkQrcode')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    books: mkBooks({ books }),
    qrcode: mkQrcode({ qrcode })
  },
  Mutation: {
    addBook: mkAddBook({ books, pubsub })
  },
  Subscription: {
    bookAdded: mkBookAdded({ pubsub })
  }
}

module.exports = resolvers
