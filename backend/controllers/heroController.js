const Hero = require('../models/Hero');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Service = require('../models/Service');
const Contact = require('../models/Contact');

exports.getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.createHero = async (req, res) => {
  try {
    const { title, subtitle, imageUrl } = req.body;
    const hero = new Hero({ title, subtitle, imageUrl });
    await hero.save();
    res.status(201).json(hero);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateHero = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, imageUrl } = req.body;
    const hero = await Hero.findByIdAndUpdate(
      id,
      { title, subtitle, imageUrl },
      { new: true, runValidators: true }
    );
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, process.env.JWT, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.createServices = async (req, res) => {
  try {
    const { services } = req.body;

    if (!Array.isArray(services) || services.length !== 3) {
      return res.status(400).json({ message: 'Exactly 3 services are required' });
    }

    const createdServices = await Service.insertMany(services);
    res.status(201).json(createdServices);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/hero/services/:id
exports.updateSingleService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(updatedService);
  } catch (err) {
    console.error('Update Single Service Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Server-side validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Email format validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email' });
    }
    
    const contact = new Contact({ name, email, message });
    await contact.save();
    
    res.status(201).json({ message: 'Contact message sent successfully!' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: errors.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Most recent first
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

