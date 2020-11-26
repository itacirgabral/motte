const { MessageType, Presence } = require('@adiwajshing/baileys')
const isPendingP = require('../../isPendingP')
const seals = require('../../seals')

const emptyAsyncIterator = async function * emptyAsyncIterator () { }

const mkDispatchBatch = ({ pubsub, connP, redis }) => ({
  subscribe: async (parent, { to }, context, info) => {
    const isPending = await isPendingP(connP)

    if (isPending) {
      throw new Error('Não to conectado ainda')
    } else {
      const conn = await connP

      const text = await redis.hget('batchDelivery', 'text')
      const lines = text.split('\n')

      const pipeline = redis.pipeline()

      // reset
      pipeline.del('batchList')// 0
      pipeline.del('batchLast')// 1
      pipeline.del('batchInfo')// 2

      pipeline.lpush('batchList', ...lines)// 3
      pipeline.rpoplpush('batchList', 'batchLast')// 4
      pipeline.hset('batchInfo', 'to', to, 'length', lines.length)// 5
      pipeline.hset('batchDelivery', 'status', 'doing')// 6

      const result = await pipeline.exec()

      const batchLast = result[4][1]

      if (batchLast) {
        conn.updatePresence(to, Presence.composing)
        setTimeout(async () => {
          conn.sendMessage(to, batchLast, MessageType.text)
          conn.updatePresence(to, Presence.available)
          redis.hset('batchInfo', 'timestamps:0:go', Date.now())
        }, batchLast.lengtbatchLasth > 50 ? 1900 : batchLast.length * 20)

        return pubsub.asyncIterator([seals.dispatchBatch])
      } else {
        redis.hset('batchDelivery', 'status', 'done')
        return emptyAsyncIterator
      }
    }
  }
})

module.exports = mkDispatchBatch
