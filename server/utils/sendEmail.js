const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {

    try {

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: process.env.EMAIL_USER,

                pass: process.env.EMAIL_PASS

            }

        });

        await transporter.sendMail({

            from: `"Society Maintenance Tracker" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html

        });

        console.log("Email Sent Successfully");

    } catch (error) {

        console.log(error);

    }

};

module.exports = sendEmail;