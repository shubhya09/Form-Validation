// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();

// app.use(cors());

// // Middleware to parse JSON request bodies
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/Login', {

// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch(err => {
//   console.log('MongoDB connection error:', err);
// });

// // Define the schema for form data
// const formSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   mobNo: String,
// });

// // Create the model (You can change the collection name here)
// const FormData = mongoose.model('FormData', formSchema, 'users'); // 'users' is the collection name

// // POST route to handle form submission
// app.post('/users', (req, res) => {
//   const { email, password, mobNo } = req.body;

//   const newFormData = new FormData({ email, password, mobNo });

//   newFormData.save()
//     .then(() => {
//       res.status(201).json({ message: 'Data saved successfully!' });
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Error saving data' });
//       console.log(err);
//     });
// });

// // Start the server on port 5000
// app.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });



// NEW File Code

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Login', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('MongoDB connection error:', err);
  });

// Define the schema for form data
const formSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  mobNo: String,
});

// Create the model
const FormData = mongoose.model('FormData', formSchema, 'users');

// POST route to handle user sign up
app.post('/users', (req, res) => {
  const { email, password, mobNo } = req.body;

  const newUser = new FormData({
    email,
    password, // Directly storing the plain-text password (not recommended)
    mobNo
  });

  newUser.save()
    .then(() => {
      res.status(201).json({ message: 'User signed up successfully!' });
    })
    .catch(err => {
      if (err.code === 11000) {
        return res.status(400).json({ message: 'Email already exists.' });
      }
      res.status(500).json({ message: 'Error saving user data.' });
      console.log(err);
    });
});

// POST route to handle user login
app.post('/users/login', (req, res) => {
  const { email, password } = req.body;

  FormData.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }

      // Directly compare plain-text passwords (not recommended)
      if (password === user.password) {
        return res.status(200).json({ message: 'Login successful!' });
      } else {
        return res.status(400).json({ message: 'Invalid password!' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error during login' });
      console.log(err);
    });
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});


