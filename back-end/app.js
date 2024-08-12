require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { authenticate, authorizeRoles } = require('./middleware/auth');
const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());


app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments')); 
app.use('/categories', require('./routes/categories'));
app.use('/admin/profile', require('./routes/admin-profile'));

app.use('/auth', require('./routes/auth'));
app.use('/users', authenticate, require('./routes/users'));


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
