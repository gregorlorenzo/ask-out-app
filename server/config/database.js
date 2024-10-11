const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const isLiveEnv = process.env.NODE_ENV === 'production';
    const dbName = process.env.DB_NAME;

    const mongoURI = isLiveEnv 
      ? process.env.MONGODB_URI_LIVE 
      : process.env.MONGODB_URI_LOCAL;

    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables.');
    }

    if (!dbName) {
      throw new Error('Database name (DB_NAME) is not defined in environment variables.');
    }

    // Validate the connection string scheme
    if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
      throw new Error('Invalid MongoDB URI scheme. It must start with "mongodb://" or "mongodb+srv://".');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName,
    });

    console.log(`MongoDB connected: ${mongoose.connection.db.databaseName}`);
    console.log(`Environment: ${isLiveEnv ? 'PRODUCTION' : 'DEVELOPMENT'}`);

    // Log the connection URI only in non-production environments
    if (!isLiveEnv) {
      console.log(`Database URI: ${mongoURI}`);
    } else {
      console.log(`Database URI: ${mongoURI}`);
    }

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
