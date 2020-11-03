/**
 * when the connection to the phone changes
 * on (event: 'connection-phone-change', listener: (state: {connected: boolean}) => void): this
 */
const connectionPhoneChange = state => {
  console.log('event connection-phone-change')
  console.dir(state)
}

module.exports = connectionPhoneChange
