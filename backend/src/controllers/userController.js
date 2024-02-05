const User = require('../models/userModel'); // Adjust the path based on your file structure
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Controller for handling user-related operations
const userController = {
    // Create a new user
    createUser: async (req, res) => {
        try {
            const { password, confirm_password, ...userData } = req.body;

            // Check if password is empty
            if (!password) {
                return res.status(400).json({ error: 'Password cannot be empty' });
            }

            // Check if passwords match
            if (password !== confirm_password) {
                return res.status(400).json({ error: 'Passwords do not match' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

            const newUser = new User({
                ...userData,
                password: hashedPassword,
            });

            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get a specific user by ID
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a specific user by ID
    updateUserById: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                req.body,
                { new: true } // Return the updated user
            );
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a specific user by ID
    deleteUserById: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // cliecntLogin
    clientAuth: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Check if username and password are provided
            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password are required' });
            }

            // Find the user by username
            const user = await User.findOne({ username });

            // Check if the user exists
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.password);

            // Check if passwords match
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Create a JWT token for authentication
            const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });

            // Pass more complete user data in the response
            const userData = {
                userId: user._id,
            };

            // Send the token and user data in the response
            res.json({ token, user: userData });

        } catch (error) {
            console.error('Error in clientAuth:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },










    // newlogin


};

module.exports = userController;
