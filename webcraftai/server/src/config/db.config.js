import mongoose from 'mongoose';

let connectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error('MONGODB_URI is not defined. Add it to your environment variables.');
  }

  connectionPromise = mongoose
    .connect(mongoURI)
    .then((conn) => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn.connection;
    })
    .catch((error) => {
      connectionPromise = null;
      console.error(`MongoDB Connection Error: ${error.message}`);
      throw error;
    });

  return connectionPromise;
};

export default connectDB;
