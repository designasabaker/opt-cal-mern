import express from "express";
import cors from "cors";
import "./loadEnv.mjs";
import records from "./routes/record.mjs";
import users from "./routes/users.mjs";
import mongoose from "mongoose";  // Import users routes
import morgan from 'morgan';

const PORT = process.env.PORT || 5050;
const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
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