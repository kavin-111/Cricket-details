const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dbs', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define a User model
const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  issue: String,
  
}));

// Middleware to parse incoming request body
app.use(express.urlencoded({ extended: true }));

// Route handler
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.post('/signup', (req, res) => {
  const { email,issue } = req.body;

  // Create a new user
  const newUser = new User({ email, issue});
  newUser.save()
    .then(() => res.redirect('http://127.0.0.1:5500/get.html'))
    .catch(err => {
      console.error('Error during sign up:', err);
      res.status(500).send('An error occurred');
    });
});

// Start the server
const port = 3002;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));