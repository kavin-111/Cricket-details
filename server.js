const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define a User model
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
  cpassword:String
}));

// Middleware to parse incoming request body
app.use(express.urlencoded({ extended: true }));

// Route handler
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/indexs.html');
  });
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Authenticate user
  User.findOne({ username, password })
    .then(user => {
      if (user) {
        res.redirect('http://127.0.0.1:5500/get.html'); // Redirect to the dashboard page
      } else {
        res.send('Invalid username or password');
      }
    })
    .catch(err => {
      console.error('Error during login:', err);
      res.status(500).send('An error occurred');
    });
});

app.post('/signup', (req, res) => {
  const { username, password ,cpassword } = req.body;

  // Create a new user
  const newUser = new User({ username, password,cpassword });
  newUser.save()
    .then(() => res.redirect('http://127.0.0.1:5500/get.html'))
    .catch(err => {
      console.error('Error during sign up:', err);
      res.status(500).send('An error occurred');
    });
});

// Start the server
const port = 3001;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));