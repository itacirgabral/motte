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
      pipeline.del('batchLast')
      pipeline.lpush('batchList', ...line)
      await pipeline.exec()

      // Don't throw the baby out with the bathwater
      let batchLast = await redis.rpoplpush('batchList', 'batchLast')

      const loop = () => {
        if (batchLast) {
          setTimeout(async () => {
            await conn.sendMessage(to, batchLast, MessageType.text)

            const obj = {
              dispatchBatch: batchLast
            }
            pubsub.publish(seals.dispatchBatch, obj)

            const pipeline = redis.pipeline()
            pipeline.rpop('batchLast')
            pipeline.rpoplpush('batchList', 'batchLast')

            const result = await pipeline.exec()
            batchLast = result[1][1]

            loop()
          }, batchLast.lengtbatchLasth > 50 ? 1900 : batchLast.length * 20)
        }
      }
      loop()

      return pubsub.asyncIterator([seals.dispatchBatch])
    }
  }
})

module.exports = mkDispatchBatch
