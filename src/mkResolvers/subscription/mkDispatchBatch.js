const { MessageType } = require('@adiwajshing/baileys')
const isPendingP = require('../../isPendingP')
const seals = require('../../seals')

const mkDispatchBatch = ({ pubsub, connP, redis }) => ({
  subscribe: async (parent, { to }, context, info) => {
    const isPending = await isPendingP(connP)

    if (isPending) {
      throw new Error('Não to conectado ainda')
    } else {
      const conn = await connP

      const text = await redis.hget('batchDelivery', 'text')
      const line = text.split('\n')

      const pipeline = redis.pipeline()
      pipeline.del('batchList')
      pipeline.lpush('batchList', ...line)
      await pipeline.exec()

      let n = 0
      const intervalId = setInterval(() => {
        const text = line[n]
        if (n < line.length) {
          const obj = {
            dispatchBatch: text
          }
          pubsub.publish(seals.dispatchBatch, obj)

          const delta = Math.trunc(500 * Math.random)
          setTimeout(async () => {
            await conn.sendMessage(to, text, MessageType.text)
            console.log(`sent "${text}"`)
          }, delta)
          n += 1
        } else {
          clearInterval(intervalId)
        }
      }, 1000)

      return pubsub.asyncIterator([seals.dispatchBatch])
    }
  }
})

module.exports = mkDispatchBatch
