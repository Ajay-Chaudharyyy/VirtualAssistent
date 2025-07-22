require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const db = require("./Config/database");
const cookieParser = require("cookie-parser");
const router = require("./Routes/userRoutes");
const cors = require("cors");

// ✅ Connect Database
db().catch(err => console.error("Database connection failed:", err.message));

// ✅ Allowed Origins (local + deployed)
const allowedOrigins = [
  "http://localhost:5173",
  "https://virtual-assistent-ajay-chaudharyys-projects.vercel.app",
];

// ✅ CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ Core Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/v1", router);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send(`<h1>SERVER IS RUNNING</h1>`);
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
