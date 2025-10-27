import Post from "../models/Post.js";
// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "name email");
        res.json(posts);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
// Get user's posts
export const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user?._id }).sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
// Get single post
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "name email");
        if (!post)
            return res.status(404).json({ message: "Post not found" });
        res.json(post);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
//# sourceMappingURL=postController.js.map