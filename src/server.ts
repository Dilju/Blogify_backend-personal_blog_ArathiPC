// backend/src/server.ts
import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors"

// ES Module setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Load .env file
const envPath = join(__dirname, "../.env");
console.log("Resolved .env path:", envPath);
dotenv.config({ path: envPath });

// ✅ Check env
console.log("Environment check:", {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT,
});

const app = express();
app.use(express.json());

// ✅ Import DB connection
const { default: connectDB } = await import("./config/db.js");
await connectDB();


app.use(
  cors({
    origin: [
      "http://localhost:5173", //for local dev
      "https://blogify-frontend-personal-blog-arathi-e5fy30lre-diljus-projects.vercel.app", // for vercel frontend
    ], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)

// ✅ Import routes
import authRoutes from "./routes/authRout.js";
import postRoutes from "./routes/postRout.js";
// (if you have userRoutes, import that too)

// ✅ Use routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
// app.use("/api/users", userRoutes); // if exists

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
