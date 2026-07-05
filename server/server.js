const complaintRoutes=require("./routes/ComplaintRoutes");
const cron = require("node-cron");
const checkOverdueComplaints = require("./jobs/overdueChecker");
const residentRoutes = require("./routes/residentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

cron.schedule("*/1 * * * *", () => {

    console.log("Running Overdue Checker...");

    checkOverdueComplaints();

});

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://society-maintenance-tracker-murex.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
    res.send("Society Maintenance Tracker API Running...");
});

const PORT = process.env.PORT || 5000;

app.use("/api/admin", adminRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/complaints",complaintRoutes);
app.use("/api/resident", residentRoutes);

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});