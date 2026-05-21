import Post from "../models/Post.js";
import Job from "../models/Job.js";

export async function getCategories(req, res) {
  try {
    const [postCategories, jobCategories] = await Promise.all([
      Post.distinct("category"),
      Job.distinct("category"),
    ]);

    const unique = [...postCategories, ...jobCategories]
      .map((category) => String(category || "").trim())
      .filter(Boolean);

    const categories = Array.from(new Set(unique)).sort((a, b) =>
      a.localeCompare(b)
    );

    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
