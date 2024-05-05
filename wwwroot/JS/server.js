const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'supersecretstring12345',
    saveUninitialized: true,
    resave: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// User schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

// Routes
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;  // Establishing a session
        res.redirect('/home');    // Redirect to the home page or dashboard
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        if (await User.findOne({ username })) {
            res.status(409).send('User already exists');  // Conflict
            return;
        }

        // Hash password and create a new user
        const hashedPassword = bcrypt.hashSync(password, 12);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Redirect to homepage after successful registration
        res.redirect('/home');
    } catch (error) {
        res.status(500).send('Server error');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
