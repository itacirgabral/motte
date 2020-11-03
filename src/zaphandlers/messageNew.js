/**
 * when a new message is relayed
 * on (event: 'message-new', listener: (message: WAMessage) => void): this
 */
const messageNew = message => {
  console.log('event message-new')
  console.dir(message)
}

module.exports = messageNew
