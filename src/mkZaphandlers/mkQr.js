const seals = require('../seals')

/**
 * when a new QR is generated, ready for scanning
 * on (event: 'qr', listener: (qr: string) => void): this
 */
const qr = ({ pubsub, redis, connP }) => async (qr) => {
  console.log('event qr')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'qr', data: qr }))
  pipeline.ltrim('log:baileys:test', 0, 99)

  pubsub.publish(seals.qr, { qr })
  pipeline.set('qrcodeLast', qr)

  await pipeline.exec()
}

module.exports = qr
