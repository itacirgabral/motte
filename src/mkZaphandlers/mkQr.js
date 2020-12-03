/**
 * when a new QR is generated, ready for scanning
 * on (event: 'qr', listener: (qr: string) => void): this
 */
const qr = ({ wsP, redis, connP }) => async (qr) => {
  console.log('event qr')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'qr', data: qr }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  pipeline.set('qrcodeLast', qr)
  await pipeline.exec()

  const ws = await wsP
  ws.send(JSON.stringify({
    t: 7,
    d: {
      topic: 'chat',
      event: 'message',
      data: {
        username: 'zapguiado',
        body: JSON.stringify({ event: 'qr', data: qr })
      }
    }
  }))
}

module.exports = qr
