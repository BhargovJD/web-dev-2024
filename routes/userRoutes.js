// Import express and controller functions
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to display all users (index page)
router.get('/', userController.getUsers);

// Route to display the create user form
router.get('/create', userController.showCreateForm);

// Route to create a new user
router.post('/', userController.createUser);

// Route to display the edit user form
router.get('/edit/:id', userController.showEditForm);

// Route to update a user
router.post('/edit/:id', userController.updateUser);

// Route to delete a user
router.post('/delete/:id', userController.deleteUser);

module.exports = router;
