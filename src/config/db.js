const mongoose = require('mongoose');

const connectDB = async (uri) => {
  if (!uri) {
    throw new Error('MONGODB_URI is required for database connection');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
};

module.exports = connectDB;
