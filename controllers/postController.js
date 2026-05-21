import Post from "../models/Post.js";
import { slugify } from "../utils/slugify.js";

export async function getPosts(req, res) {
  try {
    const posts = await Post.find().sort({ publishedAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getPostBySlug(req, res) {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function createPost(req, res) {
  try {
    const {
      title,
      excerpt = "",
      author = "",
      authorBio = "",
      category = "",
      content = "",
      coverImage = "",
      publishedAt,
      tags = [],
    } = req.body;

    const parsedTags =
      typeof tags === "string"
        ? tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : Array.isArray(tags)
        ? tags.map((tag) => String(tag).trim()).filter(Boolean)
        : [];

    let baseSlug = slugify(title);
    let slug = baseSlug;
    let index = 1;

    while (await Post.findOne({ slug })) {
      slug = `${baseSlug}-${index++}`;
    }

    const post = new Post({
      slug,
      title,
      excerpt,
      author,
      authorBio,
      category,
      content,
      coverImage,
      tags: parsedTags,
      publishedAt: publishedAt || new Date(),
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function updatePost(req, res) {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function deletePost(req, res) {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
