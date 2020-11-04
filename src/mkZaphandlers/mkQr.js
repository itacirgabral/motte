const seals = require('../seals')

/**
 * when a new QR is generated, ready for scanning
 * on (event: 'qr', listener: (qr: string) => void): this
 */
const qr = ({ pubsub }) => qr => {
  console.log('event qr')
  console.dir(qr)

  pubsub.publish(seals.qr, { qr })
}

module.exports = qr
