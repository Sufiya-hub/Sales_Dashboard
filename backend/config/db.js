const mongoose = require('mongoose');

function buildUri() {
  if (process.env.MONGO_URI) {
    return process.env.MONGO_URI;
  }
  const host = process.env.MONGO_HOST || 'localhost';
  const port = process.env.MONGO_PORT || '27017';

  const db = 'dashboard';
  const user = process.env.MONGO_USER;
  const pass = process.env.MONGO_PASS;

  if (user && pass) {
    return `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(
      pass
    )}@${host}:${port}/${db}?authSource=admin`;
  }
  return `mongodb://${host}:${port}/${db}`;
}

const uri = buildUri();

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully to: ' + uri);
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
};

module.exports = connectDB;
