// Load environment variables from .env file
require('dotenv').config();

const mongoose = require('mongoose');

// Set mongoose options to suppress deprecation warnings
mongoose.set('strictQuery', false);

// MongoDB Atlas connection string from environment variables
// The connection string should be set in the .env file as MONGODB_URI
// If MONGODB_URI is not set, throw an error to ensure proper configuration
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables. Please create a .env file with your MongoDB connection string. See .env.example for reference.');
}

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
}

async function disconnectDB() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('Disconnected from MongoDB');
  }
}

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  isConnected = false;
});

module.exports = { connectDB, disconnectDB, isConnected: () => isConnected };

