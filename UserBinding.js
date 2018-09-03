const { HttpLink } = require('apollo-link-http')
const { Binding } = require('graphql-binding')
const { makeRemoteExecutableSchema } = require('graphql-tools')
const fetch = require('node-fetch')

const schemaString = /* GraphQL */ `
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

class UserBinding extends Binding {
  constructor({ headers = {}, uri }) {
    const link = new HttpLink({
      uri,
      headers,
      fetch,
    })

    const schema = makeRemoteExecutableSchema({
      link,
      schema: schemaString,
    })

    super({ schema })
  }
}

module.exports = UserBinding
