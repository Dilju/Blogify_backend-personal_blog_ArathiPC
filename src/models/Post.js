import mongoose, { Schema, Document } from "mongoose";
const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String },
}, { timestamps: true });
export default mongoose.model("Post", postSchema);
//# sourceMappingURL=Post.js.map