const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// @desc    Register user
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10)
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      credits: user.credits
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Daily login bonus
    const today = new Date().toDateString();
    if (user.lastLogin?.toDateString() !== today) {
      user.streak = user.lastLogin && 
        new Date(user.lastLogin).getDate() === new Date().getDate() - 1 
          ? user.streak + 1 
          : 1;
      user.credits += 10;
      user.lastLogin = new Date();
      await user.save();
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      credits: user.credits,
      streak: user.streak
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };