const seals = require('../seals')

/**
 * when a new QR is generated, ready for scanning
 * on (event: 'qr', listener: (qr: string) => void): this
 */
const qr = ({ pubsub, redis, connP }) => qr => {
  console.log('event qr')
  console.dir(qr)

  pubsub.publish(seals.qr, { qr })
  redis.set('qrcodeLast', qr)
}

module.exports = qr
