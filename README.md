# graphql-binding-extend-bug
Repro:
1. clone repo
2. run "yarn install"
3. run "yarn start"
4. open "http://localhost:3998/" in browser
5. run mutation: "
    mutation {
    createUser(name: "some name") {
      id
      name
    }
  }
"
6. observe that it runs correctly
7. open "http://localhost:3999/" in browser
8. run same mutation: "
    mutation {
    createUser(name: "some name") {
      id
      name
    }
  }
"
9. observe error: "Cannot return null for non-nullable field Mutation.createUser."
10. if you move line #13 "createUser(name: String!): User!" up to #7 inside Mutation in userServerSchemaString.js file, everything will work.
