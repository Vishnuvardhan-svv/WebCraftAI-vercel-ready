import connectDB from './config/db.config.js';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import {
  errorHandler,
  notFoundHandler
} from './middleware/error.middleware.js';

const app = express();

const clientUrl = process.env.CLIENT_URL;

app.use(
  cors(
    clientUrl
      ? { origin: clientUrl }
      : {}
  )
);

app.use(express.json({ limit: '10mb' }));

// Connect to MongoDB before handling API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);

    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'WebCraft AI API is running',
    database: 'connected'
  });
});

// API routes
app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
