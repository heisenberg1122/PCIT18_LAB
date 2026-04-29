const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const studentRoutes = require('./routes/students');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// MongoDB connection with optimized options for local development
mongoose.connect("mongodb://localhost:27017/studentDB", {
    maxPoolSize: 10,
    minPoolSize: 2,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 5000,
    retryWrites: true
})
.then(() => console.log("✓ Connected to MongoDB"))
.catch((err) => {
    console.error("✗ MongoDB Connection Error:");
    console.error(`  - Address: localhost:27017`);
    console.error(`  - Database: studentDB`);
    console.error(`  - Error: ${err.message}`);
    console.error("\n  Ensure MongoDB is running. Start with: mongod");
    process.exit(1);
});

app.use(express.json());
app.use(cors());
app.use(logger);


app.use('/api/students', studentRoutes);
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to express");
});

app.use((req,res)=> {
    res.status(404).json({
        message: "Route not found"
    });
});

app.use(errorHandler)

app.listen(3000, () => {
    console.log("Server running in port 3000")
});