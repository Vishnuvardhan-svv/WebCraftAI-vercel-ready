import app from '../server/src/app.js';
import connectDB from '../server/src/config/db.config.js';

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
