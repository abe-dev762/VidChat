import express from 'express';
import "dotenv/config";
import { connectDB } from './lib/db.js';

const app = express();
const PORT = process.env.PORT

app.get("/api/auth/signup", (req, res) => {
    res.send("sign up route");
});

app.get("/api/auth/login", (req, res) => {
    res.send("login route");
});

app.get("/api/auth/logout", (req, res) => {
    res.send("logout route");
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    connectDB();
})