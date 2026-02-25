const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Access denied: Admin privileges required' });
  }
};

router.get('/dashboard', auth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const activeUsers = await User.countDocuments({ status: 'Active' });

    const newSignups = await User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    });

    const revenueAgg = await User.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$sales_amount' } } },
    ]);

    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    res.json({
      totalRevenue,
      totalUsers,
      activeUsers,
      newSignups,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
module.exports = router;
