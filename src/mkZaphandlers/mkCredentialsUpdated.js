const fs = require('fs')
const path = require('path')

const seals = require('../seals')

/**
 * when WA updates the credentials
 * on (event: 'credentials-updated', listener: (auth: AuthenticationCredentials) => void): this
 */
const credentialsUpdated = ({ pubsub }) => auth => {
  const creds = {
    clientID: auth.clientID,
    serverToken: auth.serverToken,
    clientToken: auth.clientToken,
    encKey: auth.encKey.toString('base64'),
    macKey: auth.macKey.toString('base64')
  }

  console.log('event credentials-updated')
  console.log(JSON.stringify(creds, null, 2))
  pubsub.publish(seals.credentialsUpdated, { credentialsUpdated: creds })

  const pathname = path.join(__dirname, '..', '..', 'creds', 'main.json')
  fs.writeFile(pathname, JSON.stringify(creds), () => {
    console.log(`credentials stored at ${pathname}`)
  })
}

module.exports = credentialsUpdated
