const Post = require('./models/Post');
const User = require('./models/User');
const Category = require('./models/Category');
const Comment = require('./models/Comment');

const resolvers = {
  Query: {
    getPosts: () => Post.find().populate('author categories'),
    getPost: (_, { id }) => Post.findById(id).populate('author categories'),
    getUsers: () => User.find(),
    getUser: (_, { id }) => User.findById(id),
    getCategories: () => Category.find(),
    getCategory: (_, { id }) => Category.findById(id),
    getComments: (_, { postId }) => Comment.find({ post: postId }).populate('author'),
    getComment: (_, { id }) => Comment.findById(id).populate('author post'),
  },
  Mutation: {
    createPost: (_, { title, content, author, categories, featured }) => {
      const post = new Post({ title, content, author, categories, featured });
      return post.save();
    },
    createUser: async (_, { name, email, password, role }) => {
      const user = new User({ name, email, password, role });
      await user.save();
      return user;
    },
    createCategory: (_, { name, description }) => {
      const category = new Category({ name, description });
      return category.save();
    },
    createComment: (_, { content, author, post }) => {
      const comment = new Comment({ content, author, post });
      return comment.save();
    },
  },
};

module.exports = resolvers;
