import jwt from "jsonwebtoken";
import User from "../models/User.js";
import type { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any;

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // ✅ must set user
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
