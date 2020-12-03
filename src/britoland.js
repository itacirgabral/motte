const WS = require('ws')

const britoland = async ({ bridgehandlers, redis }) => {
  const britoBridge = process.env.BRITO_BRIDGE
  const ws = new WS(britoBridge)

  ws.on('close', async (e) => {
    const data = JSON.parse(e)

    const pipeline = redis.pipeline()
    pipeline.lpush('log:bridge:test', JSON.stringify({ event: 'close', data }))
    pipeline.ltrim('log:bridge:test', 0, 99)
    await pipeline.exec()
  })

  ws.on('error', async (e) => {
    const data = JSON.parse(e)

    const pipeline = redis.pipeline()
    pipeline.lpush('log:bridge:test', JSON.stringify({ event: 'error', data }))
    pipeline.ltrim('log:bridge:test', 0, 99)
    await pipeline.exec()
  })

  ws.on('open', async (e) => {
    const data = JSON.parse(e)

    const pipeline = redis.pipeline()
    pipeline.lpush('log:bridge:test', JSON.stringify({ event: 'open', data }))
    pipeline.ltrim('log:bridge:test', 0, 99)
    await pipeline.exec()
  })

  ws.on('ping', async (e) => {
    const data = JSON.parse(e)

    const pipeline = redis.pipeline()
    pipeline.lpush('log:bridge:test', JSON.stringify({ event: 'ping', data }))
    pipeline.ltrim('log:bridge:test', 0, 99)
    await pipeline.exec()
  })

  ws.on('pong', async (e) => {
    const data = JSON.parse(e)

    const pipeline = redis.pipeline()
    pipeline.lpush('log:bridge:test', JSON.stringify({ event: 'pong', data }))
    pipeline.ltrim('log:bridge:test', 0, 99)
    await pipeline.exec()
  })

  ws.on('unexpected-response', async (e) => {
    const data = JSON.parse(e)

    const pipeline = redis.pipeline()
    pipeline.lpush('log:bridge:test', JSON.stringify({ event: 'unexpected-response', data }))
    pipeline.ltrim('log:bridge:test', 0, 99)
    await pipeline.exec()
  })

  ws.on('upgrade', async (e) => {
    const data = JSON.parse(e)

    const pipeline = redis.pipeline()
    pipeline.lpush('log:bridge:test', JSON.stringify({ event: 'upgrade', data }))
    pipeline.ltrim('log:bridge:test', 0, 99)
    await pipeline.exec()
  })

  ws.on('message', async (e) => {
    const data = JSON.parse(e)

    const pipeline = redis.pipeline()
    pipeline.lpush('log:bridge:test', JSON.stringify({ event: 'message', data }))
    pipeline.ltrim('log:bridge:test', 0, 99)
    await pipeline.exec()

    const { t, d } = data

    switch (t) {
      case 0:
        bridgehandlers.open(d)
        break
      case 1:
        bridgehandlers.join(d)
        break
      case 2:
        bridgehandlers.leave(d)
        break
      case 3:
        bridgehandlers.joinAck(d)
        break
      case 4:
        bridgehandlers.joinError(d)
        break
      case 5:
        bridgehandlers.leaveAck(d)
        break
      case 6:
        bridgehandlers.leaveError(d)
        break
      case 7:
        bridgehandlers.event(d)
        break
      case 8:
        bridgehandlers.ping(d)
        break
      case 9:
        bridgehandlers.pong(d)
        break
    }
  })

  return ws
}

module.exports = britoland
