
const { ApolloServer, PubSub } = require('apollo-server')
const Redis = require('ioredis')

const zapland = require('./zapland')
const typeDefs = require('./typeDefs')
const mkResolvers = require('./mkResolvers')
const mkZaphandlers = require('./mkZaphandlers')

const host = process.env.HOST_IP
const port = process.env.HOST_PORT
const redisConn = process.env.REDIS_CONN

const pubsub = new PubSub()
const redis = new Redis(redisConn)

const zaphandlers = mkZaphandlers({ pubsub, redis })
const connP = zapland({ zaphandlers, redis })

const resolvers = mkResolvers({ pubsub, connP, redis })
const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ host, port }).then(() => console.log('🤙  GraphQL ready'))
connP.then(() => console.log('📞  WhatsApp ready'))
