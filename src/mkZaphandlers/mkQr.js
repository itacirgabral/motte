/**
 * when a new QR is generated, ready for scanning
 * on (event: 'qr', listener: (qr: string) => void): this
 */
const qr = ({ shard, redis, connP }) => async (qr) => {
  const logKey = `zap:${shard}:log`
  const pipeline = redis.pipeline()
  pipeline.lpush(logKey, JSON.stringify({ event: 'qr', data: qr }))
  pipeline.ltrim(logKey, 0, 99)

  const lastQrcodekey = `zap:${shard}:lasQrcode`
  pipeline.set(lastQrcodekey, qr)
  await pipeline.exec()
}

module.exports = qr
