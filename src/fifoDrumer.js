const { MessageType, Presence, Mimetype } = require('@adiwajshing/baileys')
const fs = require('fs')
const delay = require('./delay')
/*
** Fee-fi-fo-fum,
** I smell the blood of an Englishman,
** Be he alive, or be he dead
** I'll grind his bones to make my bread.
*/

const fifoDrumer = ({ shard, redis, connP, redisB }) => {
  const fifoRawKey = `zap:${shard}:fifo:rawBread`
  const lastRawKey = `zap:${shard}:last:rawBread`

  const statsKey = `zap:${shard}:stats`
  const lastsentmessagetimestamp = 'lastsentmessagetimestamp'
  const lastdeltatimemessage = 'lastdeltatimemessage'
  const totalsentmessage = 'totalsentmessage'
  const totalmediasize = 'totalmediasize'

  const healthcare = {
    playing: true,
    fifoRawKey,
    lastRawKey
  }

  process.nextTick(async () => {
    const pea = await redis.llen(lastRawKey)
    healthcare.playing = healthcare.playing || pea === 0

    while (healthcare.playing) {
      const rawBread = await redisB.brpoplpush(fifoRawKey, lastRawKey, 0)
      const { type, ...crumb } = JSON.parse(rawBread)

      /*
      ** oh my ugly ifs...
      */
      if (type === 'textMessage_v001') {
        const { jid, msg } = crumb
        const delta = msg.length
        const waittime = delta > 50 ? 6000 : delta * 100 + 100

        const conn = await connP

        await conn.chatRead(jid)
        await conn.updatePresence(jid, Presence.composing)
        await delay(waittime)

        const timestampStart = Date.now()
        const bakedBread = await conn.sendMessage(jid, msg, MessageType.text)
          .catch(() => {
            healthcare.playing = false
            return false
          })

        if (bakedBread) {
          const timestampFinish = Date.now()
          await conn.updatePresence(jid, Presence.available)
          const deltatime = timestampFinish - timestampStart

          const pipeline = redis.pipeline()
          pipeline.ltrim(lastRawKey, 0, -2)
          pipeline.hset(statsKey, lastsentmessagetimestamp, timestampFinish)
          pipeline.hset(statsKey, lastdeltatimemessage, deltatime)
          pipeline.hincrby(statsKey, totalsentmessage, 1)
          await pipeline.exec()
        }
      }

      if (type === 'contactMessage_v001') {
        const { jid, name, whatsapp, organization } = crumb
        const waittime = 300

        const conn = await connP

        await conn.chatRead(jid)
        await conn.updatePresence(jid, Presence.composing)
        await delay(waittime)

        const timestampStart = Date.now()
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:${organization};\nTEL;type=CELL;type=VOICE;waid=${whatsapp}:${whatsapp}\nEND:VCARD`
        const bakedBread = await conn.sendMessage(jid, { displayname: name, vcard }, MessageType.contact)
          .catch(() => {
            healthcare.playing = false
            return false
          })

        if (bakedBread) {
          const timestampFinish = Date.now()
          await conn.updatePresence(jid, Presence.available)
          const deltatime = timestampFinish - timestampStart

          const pipeline = redis.pipeline()
          pipeline.ltrim(lastRawKey, 0, -2)
          pipeline.hset(statsKey, lastsentmessagetimestamp, timestampFinish)
          pipeline.hset(statsKey, lastdeltatimemessage, deltatime)
          pipeline.hincrby(statsKey, totalsentmessage, 1)
          await pipeline.exec()
        }
      }

      if (type === 'locationMessage_v001') {
        const { jid, description, latitude, longitude } = crumb
        const waittime = 300

        const conn = await connP

        await conn.chatRead(jid)
        await conn.updatePresence(jid, Presence.composing)
        await delay(waittime)

        const timestampStart = Date.now()

        const bakedBread = await conn.sendMessage(jid, { address: description, degreesLatitude: latitude, degreesLongitude: longitude }, MessageType.location)
          .catch(() => {
            healthcare.playing = false
            return false
          })

        if (bakedBread) {
          const timestampFinish = Date.now()
          await conn.updatePresence(jid, Presence.available)
          const deltatime = timestampFinish - timestampStart

          const pipeline = redis.pipeline()
          pipeline.ltrim(lastRawKey, 0, -2)
          pipeline.hset(statsKey, lastsentmessagetimestamp, timestampFinish)
          pipeline.hset(statsKey, lastdeltatimemessage, deltatime)
          pipeline.hincrby(statsKey, totalsentmessage, 1)
          await pipeline.exec()
        }
      }

      if (type === 'documentMessage_v001') {
        const { jid, path, filename, mimetype, size } = crumb
        const waittime = 300

        const conn = await connP

        await conn.chatRead(jid)
        await conn.updatePresence(jid, Presence.composing)
        await delay(waittime)

        let docfile
        try {
          docfile = fs.readFileSync(path)
        } catch (error) {
          healthcare.playing = false
          console.error(error)
        }
        if (docfile) {
          const bakedBread = await conn.sendMessage(jid, docfile, MessageType.document, { mimetype, filename })
            .catch(() => {
              healthcare.playing = false
              return false
            })
          if (bakedBread) {
            const timestampFinish = Date.now()
            await conn.updatePresence(jid, Presence.available)
            fs.unlinkSync(path)
            const pipeline = redis.pipeline()
            pipeline.ltrim(lastRawKey, 0, -2)
            pipeline.hset(statsKey, lastsentmessagetimestamp, timestampFinish)
            pipeline.hincrby(statsKey, totalmediasize, size)
            pipeline.hincrby(statsKey, totalsentmessage, 1)
            await pipeline.exec()
          } else {
            healthcare.playing = false
          }
        }
      }

      if (type === 'audioMessage_v001') {
        const { jid, path, mimetype, size } = crumb
        const waittime = 300

        const conn = await connP

        await conn.chatRead(jid)
        await conn.updatePresence(jid, Presence.composing)
        await delay(waittime)

        let voicefile
        try {
          voicefile = fs.readFileSync(path)
        } catch (error) {
          healthcare.playing = false
          console.error(error)
        }
        if (voicefile) {
          const bakedBread = await conn.sendMessage(jid, voicefile, MessageType.audio, { mimetype: Mimetype.ogg, ptt: true })
            .catch(() => {
              healthcare.playing = false
              return false
            })
          if (bakedBread) {
            const timestampFinish = Date.now()
            await conn.updatePresence(jid, Presence.available)
            fs.unlinkSync(path)
            const pipeline = redis.pipeline()
            pipeline.ltrim(lastRawKey, 0, -2)
            pipeline.hset(statsKey, lastsentmessagetimestamp, timestampFinish)
            pipeline.hincrby(statsKey, totalmediasize, size)
            pipeline.hincrby(statsKey, totalsentmessage, 1)
            await pipeline.exec()
          } else {
            healthcare.playing = false
          }
        }
      }

      if (type === 'imageMessage_v001') {
        const { jid, path, filename, mimetype, size } = crumb
        const waittime = 300

        const conn = await connP

        await conn.chatRead(jid)
        await conn.updatePresence(jid, Presence.composing)
        await delay(waittime)

        let imgfile
        try {
          imgfile = fs.readFileSync(path)
        } catch (error) {
          healthcare.playing = false
          console.error(error)
        }
        if (imgfile) {
          const bakedBread = await conn.sendMessage(jid, imgfile, MessageType.image, { mimetype, filename })
            .catch(() => {
              healthcare.playing = false
              return false
            })
          if (bakedBread) {
            const timestampFinish = Date.now()
            await conn.updatePresence(jid, Presence.available)
            fs.unlinkSync(path)
            const pipeline = redis.pipeline()
            pipeline.ltrim(lastRawKey, 0, -2)
            pipeline.hset(statsKey, lastsentmessagetimestamp, timestampFinish)
            pipeline.hincrby(statsKey, totalmediasize, size)
            await pipeline.exec()
          } else {
            healthcare.playing = false
          }
        }
      }
    }
  })

  return healthcare
}

module.exports = fifoDrumer
