const express = require('express');
var cors = require('cors');
require('dotenv').config({ override: true });
const connectDb = require('./db');

const app = express();
const PORT = process.env.PORT || 7000;

const formRoutes = require('./controller/form.controller');
const responseRoutes = require('./controller/response.controller');
const razorpayRoutes = require('./controller/razorpay.controller');

// Middleware
app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

// Default Route
app.get("/", (req, res) => {
    res.send("Node.js Express Server Running!");
});

//Routes
app.use("/form", formRoutes);
app.use("/response", responseRoutes);
app.use("/razorpay", razorpayRoutes);

async function startServer() {
    try {
        await connectDb();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
}

startServer();