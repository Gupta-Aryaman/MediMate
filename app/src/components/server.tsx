import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://vxx6hxv:sonkus-dozno5-rIhxot@cluster0.yziny2z.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Your routes and other Express.js configurations go here

// Start the Express.js server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
