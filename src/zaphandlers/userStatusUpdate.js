/**
 * when a user's status is updated
 * on (event: 'user-status-update', listener: (update: {jid: string, status?: string}) => void): this
 */
const userStatusUpdate = update => {
  console.log('event user-status-update')
  console.dir(update)
}

module.exports = userStatusUpdate
