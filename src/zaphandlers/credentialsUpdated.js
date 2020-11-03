/**
 * when WA updates the credentials
 * on (event: 'credentials-updated', listener: (auth: AuthenticationCredentials) => void): this
 */
const credentialsUpdated = auth => {
  console.log('event credentials-updated')
  console.dir(auth)
}

module.exports = credentialsUpdated
