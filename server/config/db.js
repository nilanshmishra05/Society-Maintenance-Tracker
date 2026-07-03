const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         console.log("Connecting to MongoDB...");

//         await mongoose.connect(process.env.MONGO_URI);

//         console.log("✅ MongoDB Connected Successfully");
//     } catch (error) {
//         console.error("❌ MongoDB Error:", error.message);
//         process.exit(1);
//     }
// };
const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Error:", error.message);
        process.exit(1);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB disconnected. Attempting reconnect...");
});
mongoose.connection.on("reconnected", () => {
    console.log("✅ MongoDB reconnected");
});

module.exports = connectDB;