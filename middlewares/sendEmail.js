const nodemailer = require("nodemailer");
const { configDotenv } = require("dotenv");
const jwt = require('jsonwebtoken');

const sendEmail = async (req, res) => {
    try {
        const email = req.emailAdd;

        const token = jwt.sign({
            data: email,
        }, process.env.JWT_SECRET_FORGET_PASS, { expiresIn: '15min' });

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        async function main() {
            const info = await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: "Reset TodoApp Password",
                html: `
                <h2>Hello User</h2>
                <p>Here is your reset password link, goto this link and reset your password. Note that this link will valid till next 15 minutes.</p>
                <p>Please click here to <a href="${process.env.CLIENT_URL}/resetPassword/${token}" target="_blank">reset your password</a></p>
                `,
            });

            console.log("Message sent: %s", info.messageId);
        }
        main().catch(console.error);

        res.send({ status: 200, msg: "Reset password link sended to user. And the link will valid for next 15 minutes", accessToken: token });

    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail;