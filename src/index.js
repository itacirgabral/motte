
const { ApolloServer, PubSub } = require('apollo-server')

const zapland = require('./zapland')
const typeDefs = require('./typeDefs')
const mkResolvers = require('./mkResolvers')
const mkZaphandlers = require('./mkZaphandlers')

const host = process.env.HOST_IP
const port = process.env.HOST_PORT

const pubsub = new PubSub()

const zaphandlers = mkZaphandlers({ pubsub })
const connP = zapland(zaphandlers)

const resolvers = mkResolvers({ pubsub, connP })
const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ host, port }).then(() => console.log('🤙  GraphQL ready'))
connP.then(() => console.log('📞  WhatsApp ready'))
