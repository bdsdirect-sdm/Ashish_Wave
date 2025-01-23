import { Request, Response, NextFunction } from 'express';
// import { Request, Response, NextFunction } from 'express';
import Preference from '../models/Preference';
import Comment from '../models/Comments';

import jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import uploadProfile from '../utils/uploadProfile';
import Wave from '../models/Waves';
import Friend from '../models/Friends';
import { sendFriendRequestMail } from '../utils/mailer';
import { uploadWave } from '../utils/uploadWave';



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
            // const updatedProfileIcon = user.profileIcon ? `http://localhost:3000/${user.profileIcon}` : '';
            res.status(200).json({ user: userWithoutPassword, message: "User Found" });
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (err) {
        res.status(500).json({ message: `Error: ${err}` });
    }
};

export const updatePassword = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.user;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (!oldPassword || !user.password) {
            res.status(400).json({ error: 'Old password or stored password is missing' });
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
    uploadProfile.single('profileIcon'),
    async (req: any, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.user;

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
        console.log(error)
    }
};


//wave

export const createWave = async (req: any, res: Response): Promise<void> => {
    try {
        const { id: userId } = req.user;

        uploadWave.single('image')(req, res, async (err: any) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }

            const { message } = req.body;
            if (!message) {
                res.status(400).json({ error: 'Message is required' });
                return;
            }

            const image = req.file ? req.file.path : '';
            console.log(image, "image");

            const newWave = await Wave.create({ message, image, status: true, userId });

            res.status(201).json({ wave: newWave, message: 'Wave created successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: `Error: ${error}` });
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

export const getAllActiveWaves = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const activeWaves = await Wave.findAll({ where: { status: true } });

        if (activeWaves.length > 0) {
            res.status(200).json({ waves: activeWaves, message: "Active Waves Found" });
        } else {
            res.status(404).json({ message: "No Active Waves Found" });
        }
    } catch (error) {
        next(error);
    }
};

//Comment
export const createComment = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { commenterId, waveId, comment } = req.body;
        const newComment = await Comment.create({
            commenterId, waveId, comment, status: true,
            commenterFirstName: '',
            commenterLastName: ''
        });

        res.status(201).json({ comment: newComment, message: 'Comment created successfully' });
    } catch (error) {
        res.status(500).json({ message: `Error: ${error}` });
    }
};

export const getCommentDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const comment = await Comment.findOne({ where: { id } });

        if (comment) {
            res.status(200).json({ comment, message: "Comment Found" });
        } else {
            res.status(404).json({ message: "Comment Not Found" });
        }
    } catch (error) {
        next(error);
    }
};

export const updateComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { comment, status } = req.body;

        const commentObj = await Comment.findOne({ where: { id } });
        if (!commentObj) {
            res.status(404).json({ error: 'Comment not found' });
            return;
        }

        commentObj.comment = comment;
        commentObj.status = status;
        await commentObj.save();

        res.status(200).json({ comment: commentObj, message: 'Comment updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const comment = await Comment.findOne({ where: { id } });
        if (!comment) {
            res.status(404).json({ error: 'Comment not found' });
            return;
        }

        comment.deletedAt = new Date().toISOString();
        await comment.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const getCommentsByWaveId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { waveId } = req.params;
        const comments = await Comment.findAll({ where: { waveId } });

        if (comments.length > 0) {
            res.status(200).json({ comments, message: "Comments Found" });
        } else {
            res.status(404).json({ message: "No Comments Found for this Wave" });
        }
    } catch (error) {
        next(error);
    }
};

//Friends 
export const sendFriendRequest = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id: inviterId } = req.user;
        const { inviteEmail, inviteMessage, inviteName } = req.body;


        const newFriendRequest = await Friend.create({
            inviterId, inviteEmail, inviteMessage, inviteName, status: false, isAccepted: false,
            deletedAt: ''
        });
        sendFriendRequestMail(inviteEmail, inviteName);
        res.status(201).json({ friendRequest: newFriendRequest, message: 'Friend Request sent successfully' });
    } catch (error) {
        res.status(500).json({ message: `Error: ${error}` });
    }
};

export const getFriendsList = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id: userId } = req.user;
        const friends = await Friend.findAll({ where: { inviterId: userId, isAccepted: true } });

        if (friends.length > 0) {
            res.status(200).json({ friends, message: "Friends list retrieved successfully" });
        } else {
            res.status(404).json({ message: "No friends found" });
        }
    } catch (error) {
        next(error);
    }
};

export const getAllFriends = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id: inviterId } = req.user;
        console.log(inviterId);

        const friends = await Friend.findAll({ where: { inviterId } });
        // if (friends.length > 0) {
        //     res.status(200).json({ friends, message: "All friends retrieved successfully" });
        // } else {
        //     res.status(200).json({ message: "No friends found" });
        // }
        // console.log(friends);

        res.status(200).json({ friends, message: "All friends retrieved successfully" });

    } catch (error) {
        next(error);
    }
};

export const getFriendRequestDetails = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.user;
        const friendRequest = await Friend.findOne({ where: { id } });

        if (friendRequest) {
            res.status(200).json({ friendRequest, message: "Friend Request Found" });
        } else {
            res.status(201).json({ message: "Friend Request Not Found" });
        }
    } catch (error) {
        next(error);
    }
};




export const upsertPreference = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    console.log(req.body, "req.body--------------");
    try {
        const userId = req.user.id;
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