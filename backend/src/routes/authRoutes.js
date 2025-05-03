const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth, requireRole } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-email', authController.verifyEmail);

// Protected routes
router.get('/profile', auth, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// Admin-only route
router.get('/admin/dashboard', auth, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to admin dashboard' });
});

module.exports = router; 