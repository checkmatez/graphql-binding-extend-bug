const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const UserBinding = require('./UserBinding')

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
    user: (_, { id }, ctx, info) => ctx.userBinding.query.user({ id }, info),
  },
  Mutation: {
    createUser: (_, { name }, ctx, info) =>
      ctx.userBinding.mutation.createUser({ name }, info),
  },
}

const schema = makeExecutableSchema({ resolvers, typeDefs })

const userBinding = new UserBinding({
  uri: 'http://localhost:3998',
})

const server = new ApolloServer({
  schema,
  context: { userBinding },
})

server
  .listen({
    port: 3999,
  })
  .then(({ url }) => console.log(`🚀 Main Server ready at ${url}`))
