import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

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

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'WebCraft AI API is running' });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
