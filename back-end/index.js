const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');  
const resolvers = require('./resolvers'); 


mongoose.connect('mongodb://localhost:27017/autumn_blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});