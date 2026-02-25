const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Correct path from root
const connectDB = require('./config/db'); // Correct path from root

connectDB();

const createAdmin = async () => {
  try {
    // Check if admin already exists to avoid duplicates
    const existingAdmin = await User.findOne({ email: 'admin@dashboard.com' });
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = new User({
      name: 'Super Admin',
      email: 'admin@dashboard.com',
      password: hashedPassword,
      role: 'admin', // This is what unlocks the charts!
      status: 'Active',
      sales_amount: 0,
      signup_date: new Date(),
    });

    await admin.save();
    console.log('-----------------------------------------------');
    console.log('Admin user created successfully!');
    console.log('Email: admin@dashboard.com');
    console.log('Password: admin123');
    console.log('-----------------------------------------------');
    process.exit();
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
