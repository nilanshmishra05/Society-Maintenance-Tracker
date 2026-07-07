const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// =======================
// Register User
// =======================
exports.register = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check Existing User
        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            role: role || "resident",
        });

        // Generate Token
        const token = generateToken(user);

        // Send Welcome Email (Optional) - Send in background without blocking
        sendEmail(
            user.email,
            "Welcome to Society Maintenance Tracker",
            `
            <h2>Hello ${user.name}</h2>

            <p>Your account has been created successfully.</p>

            <p>Thank you for registering with Society Maintenance Tracker.</p>

            <hr>

            <p>Happy to have you with us!</p>
            `
        ).then(() => {
            console.log("Welcome Email Sent");
        }).catch((emailError) => {
            console.error("Email Sending Failed:");
            console.error(emailError.message);
        });

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };

        return res.status(201).json({
            success: true,
            message: "Registration Successful",
            token,
            user: userResponse,
        });

    } catch (error) {

        console.error("========== REGISTER ERROR ==========");
        console.error(error);
        console.error(error.stack);
        console.error("====================================");

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =======================
// Login User
// =======================
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });

        }

        const normalizedEmail = email.trim().toLowerCase();

        // Find User
        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        }

        // Compare Password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });

        }

        // Generate Token
        const token = generateToken(user);

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: userResponse,
        });

    } catch (error) {

        console.error("========== LOGIN ERROR ==========");
        console.error(error);
        console.error(error.stack);
        console.error("================================");

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const crypto = require("crypto");

// =======================
// Forgot Password
// =======================
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found with this email",
            });
        }

        // Generate Token
        const resetToken = crypto.randomBytes(20).toString("hex");

        // Hash token and set to resetPasswordToken field
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes expiration

        await user.save();

        // Create reset URL
        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        const resetUrl = `${clientUrl}/reset-password/${resetToken}`;
        console.log("Reset URL generated:", resetUrl);

        const message = `
            <h2>Reset Your Password</h2>
            <p>You requested a password reset. Please click on the link below to reset your password:</p>
            <p><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>
            <p>This link is only valid for 15 minutes.</p>
            <hr>
            <p>If you did not request this reset, please ignore this email.</p>
        `;

        sendEmail(
            user.email,
            "Password Reset Request",
            message
        ).then(() => {
            console.log(`Reset email sent to: ${user.email}`);
        }).catch((err) => {
            console.error("Password reset email failed to send:", err.message);
        });

        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email",
        });

    } catch (error) {
        console.error("========== FORGOT PASSWORD ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// =======================
// Reset Password
// =======================
exports.resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.params;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required",
            });
        }

        // Hash token to compare with database token
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {
        console.error("========== RESET PASSWORD ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};