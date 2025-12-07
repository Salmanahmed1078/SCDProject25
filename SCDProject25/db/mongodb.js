// Load environment variables from .env file (if it exists)
// In Docker, environment variables are passed directly, so .env is optional
try {
  require('dotenv').config();
} catch (e) {
  // dotenv not available or .env file doesn't exist - that's okay in Docker
}

const mongoose = require('mongoose');

// Set mongoose options to suppress deprecation warnings
mongoose.set('strictQuery', false);

// MongoDB connection string from environment variables
// In Docker: passed via -e flag or docker-compose environment
// Locally: from .env file
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables. Please set it in .env file (local) or pass via -e flag (Docker).');
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

