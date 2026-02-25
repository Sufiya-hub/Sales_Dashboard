const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['sales_performance', 'user_engagement', 'active_users', 'signups'],
      index: true,
    },
    value: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['Sales', 'Users', 'Content'],
      default: 'Sales',
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Metric', MetricSchema);
