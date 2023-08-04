import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    displayName: { type: String },
    // Add any additional fields as necessary
});

export const User = mongoose.model('User', userSchema);
