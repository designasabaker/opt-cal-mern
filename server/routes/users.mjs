import express from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../utils/passwordUtils.mjs';
import { User } from '../models/User.mjs';  // Assuming you have a User model defined in /models/User.mjs

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log("receive register request");

    req.body.password = await hashPassword(req.body.password);

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'user created' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        res.status(401).send('User not exist');
        return;
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
        res.status(401).send('Invalid password');
        return;
    }

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' });  //
    const message = 'Good Luck!';

    res.json({ token, user, message });
});


export default router;
