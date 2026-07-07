require("dotenv").config();
const nodemailer = require("nodemailer");
const dns = require("dns");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Bypass SSL certificate verification issues on cloud servers
    },
    lookup: (hostname, options, callback) => {
        dns.lookup(hostname, { family: 4 }, callback);
    },
    family: 4, // Force IPv4 to prevent ENETUNREACH errors on hosts without IPv6 routing
    connectionTimeout: 10000, // 10 seconds timeout for establishing connection
    greetingTimeout: 10000,   // 10 seconds timeout for SMTP greeting response
    socketTimeout: 10000,     // 10 seconds timeout for socket inactivity
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