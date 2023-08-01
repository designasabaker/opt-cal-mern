import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    // Add any additional fields as necessary
});

export const Record = mongoose.model('Record', recordSchema);
