
const { ApolloServer, PubSub } = require('apollo-server')

const zapfield = require('./zapfield')
const typeDefs = require('./typeDefs')
const mkResolvers = require('./mkResolvers')
const mkZaphandlers = require('./mkZaphandlers')

const host = process.env.HOST_IP
const port = process.env.HOST_PORT

const pubsub = new PubSub()
const resolvers = mkResolvers({ pubsub })
const zaphandlers = mkZaphandlers({ pubsub })

const server = new ApolloServer({ typeDefs, resolvers })
const baileys = zapfield(zaphandlers)

server.listen({ host, port }).then(() => console.log('🤙  GraphQL ready'))
baileys.then(() => console.log('📞  WhatsApp ready'))
