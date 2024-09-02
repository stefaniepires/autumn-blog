const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');


router.post('/signup', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  try {

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(409).json({ message: 'This email is already subscribed.' });
    }


    const newSubscriber = new Subscriber({ name, email });
    await newSubscriber.save();

    console.log(`Simulating email sending to ${email}`);
    console.log('Subject: Welcome to Our Newsletter!');
    console.log(`Body: Hello ${name},\n\nThank you for subscribing to our newsletter! Stay tuned for updates.`);


    res.status(201).json({ message: 'Subscription successful! (Simulated email sent)' });
  } catch (error) {
    console.error('Error saving subscriber:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
