import type { Request, Response } from "express";
import Post from "../models/Post.js";
import type { AuthRequest } from "../middleware/authMIddleware.js";

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get user's posts
export const getUserPosts = async (req: AuthRequest, res: Response) => {
  try {
    const posts = await Post.find({ author: req.user?._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single post
export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
