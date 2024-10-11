const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const letterRoutes = require('./routes/letterRoutes');
const slideRoutes = require('./routes/slideRoutes');
const slideshowRoutes = require('./routes/slideshowRoutes');
const mazeRoutes = require('./routes/mazeRoutes');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// CORS configuration
const corsOptions = {
  origin: 'https://ask-out-app.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Enable if you need to send cookies or auth headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

// Routes
app.use('/api/auth', authRoutes({
  GUEST_PASSKEY: process.env.GUEST_PASSKEY,
  ADMIN_PASSKEY: process.env.ADMIN_PASSKEY,
  JWT_SECRET: process.env.JWT_SECRET
}));
app.use('/api/quiz', quizRoutes);
app.use('/api/letters', letterRoutes);
app.use('/api/slide', slideRoutes);
app.use('/api/slideshow', slideshowRoutes);
app.use('/api/maze', mazeRoutes);

// Serve static files from the uploads directory in development
if (process.env.NODE_ENV !== 'production') {
  app.use('/uploads', express.static('uploads'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
