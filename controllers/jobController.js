import Job from "../models/Job.js";
import { slugify } from "../utils/slugify.js";

export async function getJobs(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { company: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { skills: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [jobs, total] = await Promise.all([
      Job.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Job.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
}

export async function getJobBySlug(req, res) {
  try {
    const job = await Job.findOne({ slug: req.params.slug });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function createJob(req, res) {
  try {
    const {
      title,
      company = "",
      location = "",
      experience = "",
      salary = "",
      category = "",
      description = "",
      applyUrl = "",
      postedAt,
    } = req.body;

    let baseSlug = slugify(title);
    let slug = baseSlug;
    let index = 1;

    while (await Job.findOne({ slug })) {
      slug = `${baseSlug}-${index++}`;
    }

    const job = new Job({
      slug,
      title,
      company,
      location,
      experience,
      salary,
      category,
      description,
      applyUrl,
      postedAt: postedAt || new Date(),
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function updateJob(req, res) {
  try {
    const job = await Job.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function deleteJob(req, res) {
  try {
    const job = await Job.findOneAndDelete({ slug: req.params.slug });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
