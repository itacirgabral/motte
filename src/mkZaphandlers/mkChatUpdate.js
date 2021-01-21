const fetch = require('node-fetch')

/**
 *  when a chat is updated (new message, updated message, deleted, pinned, presence updated etc)
 * on (event: 'chat-update', listener: (chat: Partial<WAChat> & { jid: string }) => void): this
 */
const chatUpdate = ({ shard, redis, connP }) => {
  const logKey = `zap:${shard}:log`
  const newsKey = `zap:${shard}:news`
  const markkey = `zap:${shard}:mark`
  const webhookkey = `zap:${shard}:webhook`

  return async (chat) => {
    const json = JSON.stringify({ event: 'chat-update', data: chat })
    const pipeline = redis.pipeline()
    pipeline.lpush(logKey, json)
    pipeline.ltrim(logKey, 0, 99)
    pipeline.publish(newsKey, json)
    pipeline.get(webhookkey)// 3

    const id = chat?.messages?.array[0]?.key?.id
    if (id) {
      pipeline.hget(markkey, id)// 4
    }
    const result = await pipeline.exec()

    const number = chat.jid.split('@s.whatsapp.net')[0]
    const webhook = result[3][1]

    if (
      number.indexOf('-') === -1 && // Não é um grupo
      !chat.presences && // não é uma presença
      chat.count > 0 // não é ver tudo
    ) {
      const message = chat.messages.array[0]
      const to = shard
      const from = number
      const id = message.key.id
      const msg = message.message.conversation
      const location = message.message.locationMessage
      const contact = message.message.contactMessage

      let type
      if (msg) {
        type = 'textMessage'
      } else if (contact) {
        type = 'contactMessage'
      } else if (location) {
        type = 'locationMessage'
      }

      let jsontosend
      switch (type) {
        case 'textMessage':
          jsontosend = {
            type,
            to,
            from,
            mark: id,
            msg
          }
          if (webhook) {
            fetch(webhook, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(jsontosend)
            }).catch(() => {})
          }
          break
        case 'locationMessage':
          jsontosend = {
            type,
            to,
            from,
            mark: id,
            description: location.address,
            latitude: location.degreesLatitude,
            longitude: location.degreesLongitude
          }
          if (webhook) {
            fetch(webhook, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(jsontosend)
            }).catch(() => {})
          }
          break
        case 'contactMessage':
          jsontosend = {
            type,
            to,
            from,
            mark: id,
            vcard: contact.vcard
          }
          if (webhook) {
            fetch(webhook, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(jsontosend)
            }).catch(() => {})
          }
          break
      }
    }

    /*
    ** mensagens produzidas pela próprio api não disparam
    ** message-status-update do tipo sent
    */
    if (
      chat?.messages?.array[0]?.key?.id?.slice(0, 4) === '3EB0' && // produzido por mim
      number.indexOf('-') === -1 && // Não é um grupo
      !chat.presences && // não é uma presença
      typeof chat.count === 'undefined' // Não é mensagem recebida
    ) {
      const message = chat.messages.array[0]
      const to = number
      const from = shard
      const id = message.key.id
      const mark = await redis.hget(markkey, id)

      if (webhook) {
        fetch(webhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'sent',
            timestamp: Date.now(),
            to,
            from,
            mark
          })
        }).catch(() => {})
      }
    }
  }
}

module.exports = chatUpdate
