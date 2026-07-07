require("dotenv").config();
const nodemailer = require("nodemailer");
const dns = require("dns");

// Nodemailer Transporter for local SMTP testing
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // false for 587, true for 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
    lookup: (hostname, options, callback) => {
        dns.lookup(hostname, { family: 4 }, callback);
    },
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

const sendEmail = async (to, subject, html) => {
    // If Resend API Key is configured (ideal for production cloud servers like Render to bypass SMTP blocks)
    if (process.env.RESEND_API_KEY) {
        try {
            const response = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: "Society Maintenance <onboarding@resend.dev>",
                    to: [to],
                    subject: subject,
                    html: html,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to send email via Resend API");
            }
            console.log("Email Sent Successfully via Resend HTTP API");
            return data;
        } catch (error) {
            console.error("Resend API Error:", error.message);
            throw error;
        }
    }

    // Fallback to local SMTP (Gmail)
    try {
        await transporter.sendMail({
            from: `"Society Maintenance Tracker" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log("Email Sent Successfully via SMTP");
    } catch (error) {
        console.error("SMTP Error:", error.message);
        throw error;
    }
};

module.exports = sendEmail;