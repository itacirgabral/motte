const { ApolloServer } = require('apollo-server')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const server = new ApolloServer({ typeDefs, resolvers })

const host = process.env.HOST_IP
const port = process.env.HOST_PORT
server.listen({ host, port }).then(() => console.log('🚀  Server ready'))
