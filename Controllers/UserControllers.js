import { UserModel } from "../Models/UserModel.js";
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt';

export const createUserController = async (req, res) => {
    let { name, email, password, isPrimeUser } = req.body;

    if(process.env.isTesting != "true"){
        isPrimeUser = false;
    }

    try {
        const newUser = new UserModel({
            Name:name,
            Email:email,
            Password:password,
            isPrimeUser
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully.', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Server error while creating user.' });
    }
};

export const loginController = async(req,res) => {
    const { password, email } = req.body;
    try {
        // Fetch the user from the database using email
        const user = await UserModel.findOne({ Email:email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.Password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1w' }
        );

        res.status(200).json({message:"Successful login", token})

    } catch (error) {
        return res.status(500).json({ message: 'Server error while verifying password.' });
    }
}


