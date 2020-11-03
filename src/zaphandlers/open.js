/**
 * when the connection has opened successfully
 * on (event: 'open', listener: (result: WAOpenResult) => void): this
 */
const open = result => {
  console.log('event open')
  console.dir(result)
}

module.exports = open
