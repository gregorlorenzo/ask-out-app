const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// In-memory storage for passkeys (replace with database in production)
const passkeys = {
  guest: process.env.GUEST_PASSKEY,
  admin: process.env.ADMIN_PASSKEY
};

router.post('/login', (req, res) => {
  const { passkey } = req.body;

  if (passkey === passkeys.guest) {
    const token = jwt.sign({ user: { role: 'guest' } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else if (passkey === passkeys.admin) {
    const token = jwt.sign({ user: { role: 'admin' } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).json({ msg: 'Invalid passkey' });
  }
});

module.exports = router;