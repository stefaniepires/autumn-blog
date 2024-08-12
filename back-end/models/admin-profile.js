const mongoose = require('mongoose');

const AdminProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  contactEmail: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model('AdminProfile', AdminProfileSchema);
