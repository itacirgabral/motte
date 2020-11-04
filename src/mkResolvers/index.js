const books = require('../books')
const mkBooks = require('./query/mkBooks')
const mkAddBook = require('./mutation/mkAddBook')
const mkBookAdded = require('./subscription/mkBookAdded')

const qrcode = require('../QRcode')
const mkQrcode = require('./query/mkQrcode')

const mkCredentialsUpdated = require('./subscription/mkCredentialsUpdated')

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
    credentialsUpdated: mkCredentialsUpdated({ pubsub })
  }
})

module.exports = mkResolvers
