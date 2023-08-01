import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    title: { type: String, required: false },
    date: { type: Date, required: true },
    // Add any additional fields as necessary
    userId: { type: String, required: true },
    state: {
        timePeriods: [ { start: String, end: String } ],
        optStart: String,
        totalTime: Number,
        error: String
    },
});

export const Record = mongoose.model('Record', recordSchema);
