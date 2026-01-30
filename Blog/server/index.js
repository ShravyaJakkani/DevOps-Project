// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/ping', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ status: 'ok' });
});

// Route files
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

// Mount routers
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5001;

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
  });