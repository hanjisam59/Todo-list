const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todos");

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://your-frontend-url.onrender.com"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running and MongoDB is connected!",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/todos", todoRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
