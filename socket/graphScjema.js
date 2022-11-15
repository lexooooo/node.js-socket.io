const {buildSchema} = require("graphql");

const graphschema = buildSchema(
     
    `
    type User{
      id: ID,
      username: String,
      age: Int,
      posts: [Posts]
    }

     type Posts{
      id: ID,
      title: String,
      content: String
    }
    
    input UserInput {
      id: ID,
      username: String,!
      age: Int,!
      posts: [PostsInput]
    }

    input PostsInput {
     id: ID,
     title: String,!
     content: String!
    } 

    type Query {
     getAllUsers: [User],
     getUser(id: ID): User
    }

    `
);


module.exports = graphschema