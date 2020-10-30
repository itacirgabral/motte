const seals = require('../../seals')

const mkAddBook = ({ books, pubsub }) => (parent, { title, author }, context, info) => {
  const book = { title, author }
  books.push(book)
  pubsub.publish(seals.newBook, { bookAdded: book })
  return book
}

module.exports = mkAddBook
