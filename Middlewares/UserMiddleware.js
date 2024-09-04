import { UserModel } from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const checkEmailExistsMiddleware = async (req, res, next) => {
    const { email } = req.body;

    try {
        const existingUser = await UserModel.findOne({ Email:email });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists.' });
        }
        
        next(); // Proceed if email does not exist
    } catch (error) {
        return res.status(500).json({ message: 'Server error while checking email.' });
    }
};

export const verifyToken = (req, res, next) => {
    const token = req.body.token
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }
    
    if(process.env.isTesting === 'true'){
        next();
        return ;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId; 
        next();
    } catch (error) {
        console.log("here")
        res.status(400).json({ message: 'Invalid token.' });
    }
};



export const hashPasswordMiddleware = async (req, res, next) => {
    const { password } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        req.body.password = hashedPassword; // Replace the plain password with the hashed password
        
        next(); // Proceed to the next middleware or controller
    } catch (error) {
        return res.status(500).json({ message: 'Server error while hashing password.' });
    }
};

