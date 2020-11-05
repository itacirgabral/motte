const isPendingP = require('../../isPendingP')

const mkContacts = ({ pubsub, connP }) => async (parent, args, context, info) => {
  const isPending = await isPendingP(connP)

  if (isPending) {
    return []
  } else {
    const conn = await connP
    return Object.keys(conn.contacts).map(jid => jid.slice(0, jid.indexOf('@')))
  }
}

module.exports = mkContacts
