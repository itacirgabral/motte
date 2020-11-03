const { WAConnection, MessageLogLevel } = require('@adiwajshing/baileys')
const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const server = new ApolloServer({ typeDefs, resolvers })

const host = process.env.HOST_IP
const port = process.env.HOST_PORT
server.listen({ host, port }).then(() => console.log('🚀  Server ready'))

const creds = fs.readFileSync(path.join(__dirname, '..', 'creds', 'main.json'))

;(async () => {
  const conn = new WAConnection()
  conn.logLevel = MessageLogLevel.unhandled
  conn.loadAuthInfo(creds)
  conn.connectOptions.waitForChats = false

  await conn.connect()
})()
