// import e, { NextFunction, Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Admin from '../models/Admin';


// const secretKey = process.env.SECRET_KEY || 'secret';


// // Admin Signup
// export const adminSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const { email, password } = req.body;

//         const existingAdmin = await Admin.findOne({ where: { email } });
//         if (existingAdmin) {
//             res.status(400).json({ message: 'Admin already exists' });
//             return;
//         }


//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newAdmin = new Admin({
//             email,
//             password: hashedPassword,
//             name: 'Default Name', // Replace with actual name
//             status: 'active'
//         });

//         await newAdmin.save();

//         res.status(201).json({ message: 'Admin created successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // Admin Login
// export const adminLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const { email, password } = req.body;

//         const admin = await Admin.findOne({ where: { email } });
//         if (!admin) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: admin.id }, secretKey, { expiresIn: '1h' });

//         res.status(200).json({ token });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };