const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['sales_performance', 'user_engagement', 'active_users', 'signups'], // Specific names for your dashboard cards
      index: true,
    },
    value: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['Sales', 'Users', 'Content'], // Helps group the Top Content Views section
      default: 'Sales',
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Metric', MetricSchema);
