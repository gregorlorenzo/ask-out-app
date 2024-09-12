const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const isLiveEnv = process.env.NODE_ENV === 'production';
    const dbName = process.env.DB_NAME;
    const mongoURI = isLiveEnv 
      ? process.env.MONGODB_URI_LIVE 
      : process.env.MONGODB_URI_LOCAL;

    await mongoose.connect(mongoURI + dbName, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${mongoose.connection.db.databaseName}`);
    console.log(`Environment: ${isLiveEnv ? 'PRODUCTION' : 'DEVELOPMENT'}`);
    console.log(`Database URI: ${mongoURI}`);

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;