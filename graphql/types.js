const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const { User, Post, Comment } = require('../models');

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => {
    id: { type: GraphQLID }
    username: { type: GraphQLString }
    email: { type: GraphQLString }
    displayName: { type: GraphQLString }
  }
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.id)
      }
    },
    comments: {
      type: CommentType,
      resolve(parent, args) {
        return Comment.find({ postId: parent.id })
      }
    }
  })
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  description: "Comment Type",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    },
    post: {
      type: PostType,
      resolve(parent, args) {
        return Post.findById(parent.postId)
      }
    }
  }) 
});