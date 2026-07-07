require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 5000, // 5 seconds timeout for establishing connection
    greetingTimeout: 5000,   // 5 seconds timeout for SMTP greeting response
    socketTimeout: 5000,     // 5 seconds timeout for socket inactivity
});

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"Society Maintenance Tracker" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("Email Sent Successfully");
    } catch (error) {
        console.error("EMAIL ERROR:", error);
        throw error; // Let the caller know it failed
    }
};

module.exports = sendEmail;