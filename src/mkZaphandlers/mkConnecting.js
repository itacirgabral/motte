/**
 *  when the connection is opening
 * on (event: 'connecting', listener: () => void): this
 */
const connecting = ({ redis, connP }) => async () => {
  console.log('event connecting')

  const pipeline = redis.pipeline()
  pipeline.lpush('log:baileys:test', JSON.stringify({ event: 'connecting', data: null }))
  pipeline.ltrim('log:baileys:test', 0, 99)
  await pipeline.exec()
}

module.exports = connecting
