const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Replace this with the origin of your frontend
    credentials: true
}));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/mcq-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    console.log('Received data:', req.body);  // Log received data

    try {
        // Check if a user with the provided email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        console.log('User registered successfully:', email);
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: err.message });
    }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt:', email);  // Log login attempts

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Invalid username or password for email:', email);
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password for email:', email);
            return res.status(400).json({ message: "Invalid username or password" });
        }

        console.log('Login successful for email:', email);
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
