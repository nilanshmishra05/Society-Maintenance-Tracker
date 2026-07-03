const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getResidentDashboard
} = require("../controllers/residentController");

router.get(
    "/dashboard",
    protect,
    getResidentDashboard
);

module.exports = router;