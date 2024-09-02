require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');  
const resolvers = require('./resolvers');  

const app = express();
const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());

async function startServer() {

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();  
  server.applyMiddleware({ app });


  app.use('/posts', require('./routes/posts'));
  app.use('/comments', require('./routes/comments'));
  app.use('/categories', require('./routes/categories'));
  app.use('/admin/profile', require('./routes/admin-profile'));
  app.use('/auth', require('./routes/auth'));
  app.use('/users', require('./routes/users'));
  app.use('/subscribers', require('./routes/subscriber'));


  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();  
