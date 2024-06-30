import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

// CORS ayarlarını localhost:3000 için yapılandırma
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // Bazı tarayıcılar için gerekli
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const dbURI = 'mongodb+srv://akberoff313:9ZvHxxThglljaB9g@cluster0.m65yrci.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Mongoose schema and model for reviews
const reviewSchema = new mongoose.Schema({
  rating: Number,
  review: String,
  name: String,
  email: String,
  catagory: String,
});

const Review = mongoose.model('Review', reviewSchema);

// API route for submitting a review (without photo)
app.post('/api/reviews', async (req, res) => {
  console.log('Request Body:', req.body);

  const { rating, review, name, email, catagory } = req.body;

  try {
    const newReview = new Review({ rating, review, name, email, catagory });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API route for getting reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API route for deleting a review by ID
app.delete('/api/reviews/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: `Review with ID ${id} deleted successfully.` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
