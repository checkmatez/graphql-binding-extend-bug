module.exports = /* GraphQL */ `
  type Query {
    user(id: ID!): User!
  }
  type Mutation {
    noop: Boolean
  }
  type User {
    id: ID!
    name: String!
  }
  extend type Mutation {
    createUser(name: String!): User!
  }
`
