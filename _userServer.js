const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')

const typeDefs = gql`
  type Query {
    user(id: ID!): User!
  }
  type Mutation {
    createUser(name: String!): User!
  }
  type User {
    id: ID!
    name: String!
  }
`

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

const schema = makeExecutableSchema({ resolvers, typeDefs })

const server = new ApolloServer({
  schema,
})

server
  .listen({
    port: 3998,
  })
  .then(({ url }) => console.log(`🚀 User Server ready at ${url}`))
