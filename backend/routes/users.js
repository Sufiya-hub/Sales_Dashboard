const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Access denied: Admin privileges required' });
  }
};

router.post('/users', [auth, isAdmin], async (req, res) => {
  try {
    const { name, email, password, role, age, sales_amount, status } = req.body;

    let existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      age,
      sales_amount,
      status: status || 'Active',
    });

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/:id', [auth, isAdmin], async (req, res) => {
  const { name, email, status, role } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.status = status || user.status;
    user.role = role || user.role;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (user.id === req.user.id) {
      return res.status(400).json({ msg: 'Self-deletion is not permitted' });
    }

    await user.deleteOne();
    res.json({ msg: 'User removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
