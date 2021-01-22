const fetch = require('node-fetch')
const FormData = require('form-data')
const fs = require('fs')

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
      const image = message.message.imageMessage
      const document = message.message.documentMessage
      const audio = message.message.audioMessage

      let type
      if (msg) {
        type = 'textMessage'
      } else if (contact) {
        type = 'contactMessage'
      } else if (location) {
        type = 'locationMessage'
      } else if (image) {
        type = 'imageMessage'
      } else if (document) {
        type = 'documentMessage'
      } else if (audio) {
        type = 'audioMessage'
      }

      switch (type) {
        case 'textMessage':
          if (webhook) {
            const jsontosend = {
              type,
              to,
              from,
              msg,
              mark: id
            }
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
          if (webhook) {
            const jsontosend = {
              type,
              to,
              from,
              mark: id,
              description: location.address,
              latitude: location.degreesLatitude,
              longitude: location.degreesLongitude
            }
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
          if (webhook) {
            const jsontosend = {
              type,
              to,
              from,
              vcard: contact.vcard,
              mark: id
            }
            fetch(webhook, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(jsontosend)
            }).catch(() => {})
          }
          break
        case 'imageMessage':
          if (webhook) {
            const url = new URL(webhook)
            url.searchParams.append('type', type)
            url.searchParams.append('to', to)
            url.searchParams.append('from', from)
            url.searchParams.append('mimetype', image.mimetype)
            url.searchParams.append('size', image.fileLength)
            url.searchParams.append('mark', id)

            const conn = await connP
            const file = await conn.downloadAndSaveMediaMessage(message, `../uploads/${Date.now()}`)
            const form = new FormData()
            form.append('image', fs.createReadStream(file))

            await fetch(url.href, {
              method: 'POST', body: form
            }).catch(() => {})

            fs.unlinkSync(file)
          }
          break
        case 'documentMessage':
          if (webhook) {
            const url = new URL(webhook)
            url.searchParams.append('type', type)
            url.searchParams.append('to', to)
            url.searchParams.append('from', from)
            url.searchParams.append('filename', document.fileName)
            url.searchParams.append('mimetype', document.mimetype)
            url.searchParams.append('size', document.fileLength)
            url.searchParams.append('mark', id)

            const conn = await connP
            const file = await conn.downloadAndSaveMediaMessage(message, `../uploads/${Date.now()}`)
            const form = new FormData()
            form.append('document', fs.createReadStream(file))

            await fetch(url.href, {
              method: 'POST', body: form
            }).catch(() => {})

            fs.unlinkSync(file)
          }
          break
        case 'audioMessage':
          if (webhook) {
            const url = new URL(webhook)
            url.searchParams.append('type', type)
            url.searchParams.append('to', to)
            url.searchParams.append('from', from)
            url.searchParams.append('seconds', audio.seconds)
            url.searchParams.append('mimetype', audio.mimetype)
            url.searchParams.append('size', audio.fileLength)
            url.searchParams.append('mark', id)

            const conn = await connP
            const file = await conn.downloadAndSaveMediaMessage(message, `../uploads/${Date.now()}`)
            const form = new FormData()
            form.append('audio', fs.createReadStream(file))

            await fetch(url.href, {
              method: 'POST', body: form
            }).catch(() => {})

            fs.unlinkSync(file)
          }
          break
        default:
          console.log(JSON.stringify(message, null, 2))
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
