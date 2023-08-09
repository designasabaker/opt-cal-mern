import express from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../utils/passwordUtils.mjs';
import { User } from '../models/User.mjs';  // Assuming you have a User model defined in /models/User.mjs

const router = express.Router();
const FRONTEND_URL = process.env.FRONT_END_URL || 'http://localhost:3000';  // Replace with your frontend URL
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/register', async (req, res) => {
    console.log("receive register request");

    // First, check if the email already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Email already exists' });
        return;
    }

    req.body.password = await hashPassword(req.body.password);

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'user created' });
});

router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
        $or: [
            { username: usernameOrEmail },
            { email: usernameOrEmail }
        ]
    });

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

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log("receive forgot password request")

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    const token = crypto.randomBytes(20).toString('hex');
    // use a token to link to the user
    user.resetPasswordToken = token;
    await user.save();

    const msg = {
        to: user.email,
        from: 'optcalfind@gmail.com',  // Replace with your SendGrid verified sender
        subject: 'Password Reset',
        text: `Please click the following link to reset your password:
               ${FRONTEND_URL}/reset-password/${token}`,
        tracking_settings: {
            click_tracking: {
                enable: false
            }
        }
    };

    sgMail.send(msg)
        .then(() => {
            console.log('Email sent');
            res.send('Email sent');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Failed to send email');
        });
});

router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    console.log("receive new password request");
    console.log('new password: ' + newPassword)

    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
        res.status(404).send('Invalid token');
        return;
    }

    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    await user.save();

    res.send('Password reset successfully');
});

export default router;
