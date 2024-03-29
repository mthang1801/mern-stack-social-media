const { gql } = require('apollo-server-express');

exports.schemaInput = gql`
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }
  input LoginUserInput {
    email: String!
    password: String!
  }

  input LoginUserGoogleInput {
    email: String!
    googleId: ID!
    name: String
    imageUrl: String
  }

  input PostInput {
    text: String
    shortenText: String
    rawText: String
    mentions: [ID!]
    fileNames: [String!]
    fileMimetype: [String!]
    fileEncodings: [String!]
    status: String!
  }

  input CommentInput {
    text: String
    shortenText: String
    rawText: String
    mentions: [ID!]
  }

  input MessageInput {
    text: String
    encoding: String
    mimetype: String
    filename: String
  }

  input ChatFileInput {
    encoding: String!
    filename: String!
    mimetype: String!
  }
`;
