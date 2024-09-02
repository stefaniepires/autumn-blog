const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    categories: [Category!]!
    featured: Boolean
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Category {
    id: ID!
    name: String!
    description: String
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
  }

  type Query {
    getPosts: [Post!]!
    getPost(id: ID!): Post
    getUsers: [User!]!
    getUser(id: ID!): User
    getCategories: [Category!]!
    getCategory(id: ID!): Category
    getComments(postId: ID!): [Comment!]!
    getComment(id: ID!): Comment
  }

  type Mutation {
    createPost(title: String!, content: String!, author: ID!, categories: [ID!]!, featured: Boolean): Post!
    createUser(name: String!, email: String!, password: String!, role: String): User!
    createCategory(name: String!, description: String): Category!
    createComment(content: String!, author: ID!, post: ID!): Comment!
  }
`;

module.exports = typeDefs;
