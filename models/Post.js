import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    author: { type: String, default: "" },
    authorBio: { type: String, default: "" },
    category: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    applyUrl:{type:String,default:""},
    tags: [{ type: String }],
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
