const isPendingP = require('../../isPendingP')

const mkContacts = ({ pubsub, connP, redis }) => async (parent, args, context, info) => {
  const isPending = await isPendingP(connP)

  if (isPending) {
    return []
  } else {
    const conn = await connP
    return Object.keys(conn.contacts)
  }
}

module.exports = mkContacts
