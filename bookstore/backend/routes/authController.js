const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/keys');

const auth = require('../middleware/auth');

const User = require('../models/User');

const router = express.Router();

// Helper function for JWT
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.jwtSecret, {
        expiresIn: 86400    // expires in 1 day = 86400s
    })
}

// @route   POST auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            // Email/user already exists
            return res.status(400).send({ error: `The email ${email} is already in use.` });
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user, token: generateToken({ id: user.id }) });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

// @route   POST auth/authenticate
// @desc    Auth user
// @access  Public
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        // Email/user doesn't exist
        // return res.status(400).send({ error: 'Email not found. Please sign up.' });
        return res.status(400).json({ error: 'Email not found. Please sign up.' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        // password incorrect
        return res.status(400).send({ error: 'Your email and password do not match' });
    }

    user.password = undefined;

    res.send({ user, token: generateToken({ id: user.id }) });
});

// @route   GET auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    res.send({ ok: true, user: req.userId });
    // User.findById(req.user.id)
    // .select("-password")
    // .then(user => res.json(user));
});

module.exports = app => app.use('/api/auth', router);