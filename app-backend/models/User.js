const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    credits: {
      type: Number,
      default: 0
    },
    streak: {
      type: Number,
      default: 0
    },
    lastLogin: {
      type: Date
    },
    profileCompleted: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    savedContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeedItem'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
