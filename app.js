// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Import route modules
const userRoutes = require('./routes/userRoutes');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (Bootstrap and custom CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Set up the view engine (EJS)
app.set('view engine', 'ejs');

// Use the routes module
app.use('/users', userRoutes);

// 404 Page: for non-existent routes
app.get('*', (req, res) => {
  res.status(404).render('404'); // Handling server-side errors (500 Status Code) can be done similarly
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
