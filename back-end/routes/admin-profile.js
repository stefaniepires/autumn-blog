const express = require('express');
const router = express.Router();
const AdminProfile = require('../models/admin-profile');
const { authenticate, authorizeRoles } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const adminProfile = await AdminProfile.findOne().populate('user');
    if (!adminProfile) {
      return res.status(404).json({ message: 'Admin profile not found' });
    }
    res.json(adminProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', authenticate, authorizeRoles(['admin']), async (req, res) => {
  const { bio, profilePicture, contactEmail } = req.body;

  try {
    let adminProfile = await AdminProfile.findOne({ user: req.auth.id });

    if (adminProfile) {
      adminProfile.bio = bio || adminProfile.bio;
      adminProfile.profilePicture = profilePicture || adminProfile.profilePicture;
      adminProfile.contactEmail = contactEmail || adminProfile.contactEmail;
    } else {
      adminProfile = new AdminProfile({
        user: req.auth.id,
        bio,
        profilePicture,
        contactEmail,
      });
    }

    const savedProfile = await adminProfile.save();
    res.json(savedProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
