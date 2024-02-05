const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

const userRoutes = () => {

    // Create a new user
    router.post('/sign_up', userController.createUser);

    // Get all users
    router.get('/fetch', userController.getAllUsers);

    // Get a specific user by ID
    router.get('/fetch/:userId', userController.getUserById);


    // // POST request to /api/login
    router.post('/login', userController.clientAuth);


    // Update a specific user by ID
    // router.put('/users/:userId', userController.updateUserById);

    // Delete a specific user by ID
    // router.delete('/users/:userId', userController.deleteUserById);

    return router;
}
module.exports = userRoutes;
