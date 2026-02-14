import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export async function sendMail({ email, emailType, userId }) {
    try {
        //create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 12);

        if (emailType === "VERIFY_EMAIL") {
            await User.findByIdAndUpdate(userId, {
                emailVerificationToken: hashedToken,
                emailVerificationExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET_PASSWORD") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000
            })
        }else {
            throw new Error("Invalid email type")

        }

        const transport = nodemailer.createTransport({
            host: EMAIL_HOST,
            port: EMAIL_PORT,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });

        const mailOptions = {
            from: EMAIL_FROM,
            to: email,
            subject: emailType === "VERIFY_EMAIL" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?id=${userId}&token=${hashedToken}">here</a> to ${emailType === "VERIFY_EMAIL" ? "verify your email" : "reset your password"}
            or copy and paste the link in your browser. <br> ${process.env.DOMAIN}/verifyemail?id=${userId}&token=${hashedToken}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        console.log("Email sent successfully", mailResponse)
        return mailResponse;

    } catch (error) {
        throw new Error(error.message);
    }
}