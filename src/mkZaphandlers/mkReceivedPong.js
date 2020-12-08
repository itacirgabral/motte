/**
 * when WA sends back a pong
 * on (event: 'received-pong', listener: () => void): this
 */
const receivedPong = ({ redis, connP }) => async () => {
  console.log('event received-pong')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'received-pong', data: null }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()
}

module.exports = receivedPong
