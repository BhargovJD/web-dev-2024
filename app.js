// Import necessary modules
const express = require('express'); // Express is a web framework for Node.js
const bodyParser = require('body-parser'); // Body-Parser is middleware for parsing request bodies
const path = require('path'); // Path module to handle and transform file paths

// Initialize Express app
const app = express(); // Create an instance of the Express application
const PORT = 3000; // Set the port on which the server will listen

// Middleware
app.set('view engine', 'ejs'); // Set EJS as the templating engine for rendering views
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies (forms)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (like CSS, JS, images) from the 'public' folder

// Dummy data (in-memory database for demonstration)
let items = [ // This is an array of objects representing items
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
];

// Routes

// Route to display all items on the homepage
app.get('/', (req, res) => {
  res.render('index', { items }); // Render the 'index' view and pass the 'items' data to it
});

// Route to show the form for adding a new item
app.get('/add', (req, res) => {
  res.render('add'); // Render the 'add' view which will contain a form for adding items
});

// Route to handle form submission for adding a new item
app.post('/add', (req, res) => {
  const { name, description } = req.body; // Get 'name' and 'description' from the submitted form data
  const id = items.length ? items[items.length - 1].id + 1 : 1; // Generate a new ID for the new item (based on the last item's ID)
  console.log(items[items.length - 1].id); // Log the ID of the last item (for debugging)
  items.push({ id, name, description }); // Add the new item to the 'items' array
  console.log(items); // Log the entire items array (for debugging)
  res.redirect('/'); // Redirect the user back to the homepage
});

// Route to display the form for editing an item (based on the item's ID)
app.get('/edit/:id', (req, res) => {
  const item = items.find(i => i.id == req.params.id); // Find the item by its ID from the URL parameters
  res.render('edit', { item }); // Render the 'edit' view and pass the found item to it
});

// Route to handle form submission for editing an item
app.post('/edit/:id', (req, res) => {
  const { id } = req.params; // Get the ID of the item to edit from the URL parameters
  const { name, description } = req.body; // Get the new 'name' and 'description' from the form data
  const item = items.find(i => i.id == id); // Find the item to edit by ID
  if (item) { // If the item is found
    item.name = name; // Update the item's name
    item.description = description; // Update the item's description
  }
  res.redirect('/'); // Redirect the user back to the homepage
});

// Route to handle the deletion of an item
app.post('/delete/:id', (req, res) => {
  items = items.filter(i => i.id != req.params.id); // Remove the item with the matching ID from the 'items' array
  res.redirect('/'); // Redirect the user back to the homepage
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Log a message indicating the server is running
});
