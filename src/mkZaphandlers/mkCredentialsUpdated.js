const fs = require('fs')
const path = require('path')

/**
 * when WA updates the credentials
 * on (event: 'credentials-updated', listener: (auth: AuthenticationCredentials) => void): this
 */
const credentialsUpdated = ({ pubsub }) => auth => {
  console.log('event credentials-updated')
  const authInfo = JSON.stringify({
    clientID: auth.clientID,
    serverToken: auth.serverToken,
    clientToken: auth.clientToken,
    encKey: auth.encKey.toString('base64'),
    macKey: auth.macKey.toString('base64')
  })

  const pathname = path.join(__dirname, '..', '..', 'creds', 'main.json')
  fs.writeFile(pathname, authInfo, () => {
    console.log(`credentials stored at ${pathname}`)
    console.log(authInfo)
  })
}

module.exports = credentialsUpdated
