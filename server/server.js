const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const slideshowRoutes = require('./routes/slideshowRoutes');
const letterRoutes = require('./routes/letterRoutes');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes({
  GUEST_PASSKEY: process.env.GUEST_PASSKEY,
  ADMIN_PASSKEY: process.env.ADMIN_PASSKEY,
  JWT_SECRET: process.env.JWT_SECRET
}));
app.use('/api/quiz', quizRoutes);
app.use('/api/slideshow', slideshowRoutes);
app.use('/api/letters', letterRoutes);

// Serve static files from the uploads directory in development
if (process.env.NODE_ENV !== 'production') {
  app.use('/uploads', express.static('uploads'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));