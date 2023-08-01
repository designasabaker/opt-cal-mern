import express from 'express';
import { Record } from '../models/Record.mjs';  // Assuming you have a Record model defined in /models/Record.mjs
import jsonwebtoken from 'jsonwebtoken';

const router = express.Router();


// This is a middleware that will check if a JWT is provided in the Authorization header
const checkJwt = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  // Assumes 'Bearer' scheme

    if (!token) {
        return res.status(401).send('Access token required');
    }

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).send('Invalid access token');
        }

        req.user = payload;  // Add the payload to the request object
        next();  // Continue to the next middleware or route handler
    });
};

router.get('/', checkJwt, async (req, res) => {
    // The user's ID is stored in req.user.id
    const record = await Record.findOne({ userId: req.user.id });
    if (!record) {
        res.status(404).send('No record found for this user');
        return;
    }

    res.json(record);
});

router.post('/', checkJwt, async (req, res) => {
    const update = {
        ...req.body,
        userId: req.user.id,
    };

    const record = await Record.findOneAndUpdate({ userId: req.user.id }, update, { new: true, upsert: true });

    res.json(record);
});

// You can add more record-related routes here

export default router;
