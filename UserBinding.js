const { HttpLink } = require('apollo-link-http')
const { Binding } = require('graphql-binding')
const { makeRemoteExecutableSchema } = require('graphql-tools')
const fetch = require('node-fetch')

const schemaString = require('./userServerSchemaString')

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
