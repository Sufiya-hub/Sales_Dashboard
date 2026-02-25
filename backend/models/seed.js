const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./User');
const connectDB = require('../config/db');

connectDB();

const users = JSON.parse(fs.readFileSync('./MOCK_DATA.json', 'utf-8'));

const seedData = async () => {
  try {
    const transformedUsers = users.map((u) => ({
      name: u.full_name,
      email: u.email_address,
      password: 'password123',
      sales_amount: u.sales_amount,
      status: u.status,
      age: u.age,
      signup_date: new Date(u.signup_date),
    }));

    await User.deleteMany();
    await User.insertMany(transformedUsers);
    console.log('Successfully seeded 1000 users!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
