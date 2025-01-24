import e, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import User from '../models/User';
import Wave from '../models/Waves';


const secretKey = process.env.SECRET_KEY || 'your_jwt_secret';


// Admin Signup
export const adminSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('adminSignup');
    try {
        const { email, password } = req.body;

        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) {
            res.status(400).json({ message: 'Admin already exists' });
            return;
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            email,
            password: hashedPassword,
            name: 'Admin',
            status: 'active'
        });

        await newAdmin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Admin Login
export const adminLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ where: { email } });
        // console.log('admin=-=-=-=-=-=-=', admin);
        if (!admin) {
            res.status(400).json({ message: 'Invalid credentials' });
            return
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return
        }

        const token = jwt.sign({ id: admin.id }, secretKey, { expiresIn: '1h' });
        const adminName = admin.name;

        res.status(200).json({ token, adminName });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

//get user and wave counts

export const getUserAndWaveCounts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userCount = await User.count();
        const waveCount = await Wave.count();

        res.status(200).json({ userCount, waveCount });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

//get all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Change user status
export const changeUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId, status } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.status = status;
        await user.save();

        res.status(200).json({ message: 'User status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete user
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        await user.destroy();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get user basic details
export const getUserBasicDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId, {
            attributes: ['id', 'email', 'name', 'status']
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get user all details
export const getUserAllDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get wave list
export const getWaveList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const waves = await Wave.findAll();
        res.status(200).json(waves);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Change wave status
export const changeWaveStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { waveId, status } = req.body;

        const wave = await Wave.findByPk(waveId);
        if (!wave) {
            res.status(404).json({ message: 'Wave not found' });
            return;
        }

        wave.status = status;
        await wave.save();

        res.status(200).json({ message: 'Wave status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete wave
export const deleteWave = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { waveId } = req.params;

        const wave = await Wave.findByPk(waveId);
        if (!wave) {
            res.status(404).json({ message: 'Wave not found' });
            return;
        }

        await wave.destroy();

        res.status(200).json({ message: 'Wave deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update wave
export const updateWave = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { waveId } = req.params;
        const { name, description, status } = req.body;

        const wave = await Wave.findByPk(waveId);
        if (!wave) {
            res.status(404).json({ message: 'Wave not found' });
            return;
        }

        // wave.name = name;
        // wave.description = description;
        wave.status = status;
        await wave.save();

        res.status(200).json({ message: 'Wave updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get user count
export const getUserCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userCount = await User.count();
        res.status(200).json({ userCount });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
