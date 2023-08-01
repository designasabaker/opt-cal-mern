import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add any additional fields as necessary
});

export const User = mongoose.model('User', userSchema);
