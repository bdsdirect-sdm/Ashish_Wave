import { Request, Response, NextFunction } from 'express';
// import { Request, Response, NextFunction } from 'express';
import Preference from '../models/Preference';

import jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import upload from '../utils/multer';
import Wave from '../models/Waves';



//user
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password, ...otherDetails } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ ...otherDetails, email, password: hashedPassword });

        res.status(201).json(newUser);
    } catch (error) {
        return next(error);
    }
};


export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ error: 'Invalid email or password' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ error: 'Invalid email or password' });
            return;
        }

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });


        res.status(200).json({ token, message: 'Login Successful' });
    } catch (error) {
        res.status(500).json({ message: 'login Failed' })
        console.log(error)
        return
    }
};

export const getUserDetails = async (req: any, res: Response): Promise<void> => {
    try {
        const { id } = req.user;
        const user = await User.findOne({ where: { id } });
        if (user) {
            const { password, ...userWithoutPassword } = user.toJSON();
            res.status(200).json({ user: userWithoutPassword, message: "User Found" });
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (err) {
        res.status(500).json({ message: `Error: ${err}` });
    }
};

export const updatePassword = async (req: any, res: Response, next: NextFunction): Promise<void>  => {
    try {
        const { id } = req.user;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ error: 'Old password is incorrect' });
            return;
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        next(error);
    }
};


export const updateUserprofileIcon = [
    upload.single('profileIcon'),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;

            const user = await User.findOne({ where: { id } });
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            if (!req.file) {
                res.status(400).json({ error: 'No file uploaded' });
                return;
            }

            user.profileIcon = req.file.path;
            await user.save();

            res.status(200).json({ message: 'Profile picture updated successfully', profileIcon: user.profileIcon });
        } catch (error) {
            next(error);
        }
    }
];

export const updateUser = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.user;
        const updateData = req.body;
        

        const user = await User.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        await user.update(updateData);

        const { password, ...updatedUserWithoutPassword } = user.toJSON();
        res.status(200).json({ user: updatedUserWithoutPassword, message: 'User updated successfully' });
    } catch (error) {
        console.log(error + "----------------------------------------")
    }
};


//wave

export const createWave = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id: userId } = req.user;
        console.log(userId);


        const { message, image } = req.body;

        const newWave = await Wave.create({ message, image, status: true, userId });

        res.status(201).json({ wave: newWave, message: 'Wave created successfully' });
    } catch (error) {
        next(error);
    }
};


export const getWaveDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const wave = await Wave.findOne({ where: { id } });

        if (wave) {
            res.status(200).json({ wave, message: "Wave Found" });
        } else {
            res.status(404).json({ message: "Wave Not Found" });
        }
    } catch (error) {
        next(error);
    }
};

export const updateWave = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { message, image, status } = req.body;

        const wave = await Wave.findOne({ where: { id } });
        if (!wave) {
            res.status(404).json({ error: 'Wave not found' });
            return;
        }

        wave.message = message;
        wave.image = image;
        wave.status = status;
        await wave.save();

        res.status(200).json({ wave, message: 'Wave updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteWave = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const wave = await Wave.findOne({ where: { id } });
        if (!wave) {
            res.status(404).json({ error: 'Wave not found' });
            return;
        }

        wave.deletedAt = new Date().toISOString();
        await wave.save();

        res.status(200).json({ message: 'Wave deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const getWavesByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;
        const waves = await Wave.findAll({ where: { userId } });

        if (waves.length > 0) {
            res.status(200).json({ waves, message: "Waves Found" });
        } else {
            res.status(404).json({ message: "No Waves Found for this User" });
        }
    } catch (error) {
        next(error);
    }
};

export const getLatestWaves = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const waves = await Wave.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10
        });

        if (waves.length > 0) {
            res.status(200).json({ waves, message: "Latest Waves Found" });
        } else {
            res.status(404).json({ message: "No Waves Found" });
        }
    } catch (error) {
        next(error);
    }
};




export const upsertPreference = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    console.log("at upsertPreference");
    try {
        const { userId } = req.user.id;
        // console.log(req.user.id + "----------------------------------------");
        const {
            language,
            breakfast,
            lunch,
            dinner,
            wakeTime,
            bedTime,
            weight,
            height,
            bloodGlucose,
            cholesterol,
            bloodPressure,
            distance,
            systemEmails,
            memberServiceEmails,
            sms,
            phoneCall,
            post
        } = req.body;

        const [preference, created] = await Preference.upsert({
            userId,
            language,
            breakfast,
            lunch,
            dinner,
            wakeTime,
            bedTime,
            weight,
            height,
            bloodGlucose,
            cholesterol,
            bloodPressure,
            distance,
            systemEmails,
            memberServiceEmails,
            sms,
            phoneCall,
            post
        });

        if (created) {
            res.status(201).json({ preference, message: "Preference created successfully" });
        } else {
            res.status(200).json({ preference, message: "Preference updated successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: `Error -----------------------: ${error}` });
    }
};