const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')

const schemaString = require('./userServerSchemaString')

const resolvers = {
  Query: {
    user: (_, { id }) => ({
      id,
      name: 'test',
    }),
  },
  Mutation: {
    createUser: (_, { name }) => ({
      id: 1,
      name,
    }),
  },
}

const schema = makeExecutableSchema({ resolvers, typeDefs: schemaString })

const server = new ApolloServer({
  schema,
})

server
  .listen({
    port: 3998,
  })
  .then(({ url }) => console.log(`🚀 User Server ready at ${url}`))
