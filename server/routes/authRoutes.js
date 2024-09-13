const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = function({ GUEST_PASSKEY, ADMIN_PASSKEY, JWT_SECRET }) {
  const router = express.Router();

  // In-memory storage for passkeys (replace with database in production)
  const passkeys = {
    guest: GUEST_PASSKEY,
    admin: ADMIN_PASSKEY
  };

  router.post('/login', (req, res) => {
    const { passkey } = req.body;

    if (passkey === passkeys.guest) {
      const token = jwt.sign({ user: { role: 'guest' } }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else if (passkey === passkeys.admin) {
      const token = jwt.sign({ user: { role: 'admin' } }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(400).json({ msg: 'Invalid passkey' });
    }
  });

  return router;
};