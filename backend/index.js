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

// ✅ Middlewares
app.use(express.json());
app.use(cors({
  origin: "https://virtual-assistent-git-main-ajay-chaudharyys-projects.vercel.app", // ✅ your frontend origin
  credentials: true // ✅ if you're using cookies or authorization headers
}));


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
