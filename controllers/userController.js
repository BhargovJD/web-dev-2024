// Sample data for users (in a real app, this would come from a database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];
// console.log(users);
// Function to get all users
exports.getUsers = (req, res) => {
  const nameFilter = req.query.name || ''; // Get the search term from the query parameter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(nameFilter.toLowerCase())
  );
  res.render('index', { users: filteredUsers, nameFilter }); // Pass the filter term to the view
};


// Function to display the create user form
exports.showCreateForm = (req, res) => {
  res.render('create');
};

// Function to add a new user
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.redirect('/users');
};

// Function to display the edit user form
exports.showEditForm = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).render('404'); // Handling "Not Found" cases
  }
  res.render('edit', { user });
};

// Function to update a user's information
exports.updateUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).render('404'); // Handling "Not Found" cases
  }
  user.name = req.body.name;
  user.email = req.body.email;
  res.redirect('/users');
};

// Function to delete a user
exports.deleteUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  users = users.filter(u => u.id !== userId);
  res.redirect('/users');
};
