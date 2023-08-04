import express from "express";
import cors from "cors";
import "./loadEnv.mjs";
import records from "./routes/record.mjs";
import users from "./routes/users.mjs";
import mongoose from "mongoose";
import {User} from "./models/User.mjs";  // Import users routes
// import morgan from 'morgan';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';

const PORT = process.env.PORT || 5050;
const app = express();



passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `https://${process.env.BACK_END_URL}/auth/google/callback`
    },
    function(accessToken, refreshToken, profile, cb) {
        // 在这里，你可以使用 'profile' 信息（包含 Google 用户的信息）在你的数据库中创建或更新一个用户
        // 然后你可以调用 'cb' 来通知 Passport 这个过程已经完成
        User.findOneAndUpdate(
            { googleId: profile.id },
            { username: profile.emails[0].value, displayName: profile.displayName, googleId: profile.id },
            { upsert: true, new: true },
            function(err, user) {
                return cb(err, user);
            }
        );
    }
));

// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }
app.use(cors());
app.use(express.json());

app.use("/record", records);
app.use("/users", users);  // Add users routes

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
        console.log(`server running on PORT ${PORT}...`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}

// Passport 初始化和会话中间件
app.use(passport.initialize());
app.use(session({
    secret: process.env.SECRET_KEY,  // Replace 'your_secret_key' with your actual secret key
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.session());

// Google OAuth 路由
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // 如果身份验证成功，重定向到首页。
        res.redirect('/');
    });