const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');
const auth = require('../middleware/auth');

// GET current hero content
router.get('/', heroController.getHero);

// PUT update hero content (protected)
router.put('/:id', auth, heroController.updateHero);
router.post('/', auth, heroController.createHero);

// POST admin login
router.post('/admin/login', heroController.adminLogin);

// GET all services
router.get('/services', heroController.getServices);
router.post('/services', heroController.createServices);

// PUT update all services (protected)
router.put('/services/:id', auth, heroController.updateSingleService);

// POST create contact submission
router.post('/contact', heroController.createContact);
// GET all contacts (protected)
router.get('/contacts', auth, heroController.getContacts);

module.exports = router; 