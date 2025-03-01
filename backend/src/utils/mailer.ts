import nodemailer from 'nodemailer'
import { Local } from '../environment/env';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: false, 
    auth: {
        user: Local.MAIL_USER,
        pass: Local.MAIL_PASS
        }
});
//Send OTP to the user's email
function sendOTP(email:string, OTP:string){
    const mailOptions = {
        from: Local.MAIL_USER,
        to: email,
        subject: "Verify Account",
        html: `<b>Greetings,</b> <br/> <h5 style="margin-left: auto;">Your OTP for Verify Email</h5> <br/> <p>Your OTP for verification is: ${OTP}</p> <br/> <h5>${OTP}</h5><br/> <span><b>Kindly note:</b> Please be aware of phishing sites and always make sure you are visiting the official Eye-Refer website when entering sensitive data.</span> <br/><br/>
        <span style="margin-left: auto;">© 2024 Eye-Refer. All rights reserved<span>`
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            return console.log("Error: ", error);
            }
        return info.response;
    });
}


//Send Friend Request to the user's email
function sendFriendRequestMail(email:string, username:string){
    const mailOptions = {
        from: Local.MAIL_USER,
        to: email,
        subject: "Friend Request",
        html: `<b>Greetings,</b> <br/> <h5 style="margin-left: auto;">Friend Request</h5> <br/> <p>${username} has sent you a friend request.</p> <br/> <h5>${username}</h5><br/> <span><b>Kindly note:</b> Please be aware of phishing sites and always make sure you are visiting the official Eye-Refer website when entering sensitive data.</span> <br/><br/>
        <span style="margin-left: auto;">© 2024 Eye-Refer. All rights reserved<span>`
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            return console.log("Error: ", error);
            }
        return info.response;
    });
}
export { sendFriendRequestMail, sendOTP };