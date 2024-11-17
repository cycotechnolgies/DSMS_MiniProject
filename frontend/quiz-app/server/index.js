const express = require('express');
const cors = require('cors');
const path = require('path');
const quizData = require('./data/quizData');

const app = express();
const PORT = 5000;

// Enable CORS for cross-origin requests
app.use(cors());

// Serve static files from the "public" folder
app.use('/assets',express.static(path.join(__dirname, '../assets')));

// Route to get quiz data
app.get('/api/quiz', (req, res) => {
  res.json(quizData);
});

// Route to serve images by imageId
app.get('/api/images/:imageId', (req, res) => {
  const imageId = req.params.imageId;
  const imagePath = path.join(__dirname, 'public', 'images', `${imageId}.png`); // Or .webp, .jpeg based on file type
  res.sendFile(imagePath);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
