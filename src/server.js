import express from "express";
import * as dotenv from "dotenv";
import * as path from "path"; // 1. Import path
import { fileURLToPath } from "url"; // 2. Import fileURLToPath

// --- REQUIRED FIX FOR ES MODULES ---
// 3. Define __dirname (since it's not available in ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 4. Explicitly load .env using the absolute path
// This resolves the path from src/ to backend/.env
dotenv.config({
    path: path.resolve(__dirname, '..', '.env') 
});
// ------------------------------------

console.log(".env loaded, MONGO_URI =", process.env.MONGO_URI); 

import * as cors from "cors";
import * as morgan from "morgan";
// We don't need to re-import path, and your existing setup uses path below:

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRout.js";
import postRoutes from "./routes/postRout.js";
import authRoutes from "./routes/authRout.js";

connectDB(); // This should now succeed!

const app = express();
// CORS
app.use(cors.default({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
}));
// Logging
app.use(morgan.default("dev"));
// Body parser
app.use(express.json());
// Serve uploaded images (This line relies on the defined __dirname!)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
// Health check
app.get("/", (req, res) => {
    res.send("API is running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=server.js.map