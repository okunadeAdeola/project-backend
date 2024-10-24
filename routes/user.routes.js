// routes/user.routes.js

const express = require('express');
const router = express.Router();
const { registeredStudent, loginUser, forgotPassword, resetPassword } = require('../controller/user.controller');

router.post('/registers', registeredStudent);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
