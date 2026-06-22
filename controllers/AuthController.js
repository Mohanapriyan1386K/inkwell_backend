import jwt from "jsonwebtoken"
import Auth from "../models/AuthSchema.js"
import bcrypt from "bcryptjs";

export async function Signup(req, res) {
    try {
        const { name, Email, password, role } = req.body;


        const existingUser = await Auth.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        if (!name || !Email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Auth.create({ name, Email, password: hashedPassword, role });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export async function Login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ Email: email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export async function getCurrentUser(req, res) {
    try {
        const user = await Auth.findById(req.user._id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


