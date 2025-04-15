// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/check-email', authController.checkEmail);
router.post('/signup', authController.register);
router.post('/google-signup', authController.googleAuth);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin); // New route for Google login

module.exports = router;