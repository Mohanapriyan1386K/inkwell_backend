import Job from "../models/Job.js";
import { slugify } from "../utils/slugify.js";

function escapeRegex(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseSkills(skills) {
  if (typeof skills === "string") {
    return skills.split(",").map((skill) => skill.trim()).filter(Boolean);
  }

  if (Array.isArray(skills)) {
    return skills.map((skill) => String(skill).trim()).filter(Boolean);
  }

  return [];
}

function normalizeDescription(description) {
  if (description == null) {
    return "";
  }

  const value = String(description);
  return value === "<p><br></p>" ? "" : value;
}

export async function getJobs(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = String(req.query.search || "").trim();
    const searchRegex = search ? new RegExp(escapeRegex(search), "i") : null;

    const skip = (page - 1) * limit;

    const filter = searchRegex
      ? {
        $or: [
          { title: searchRegex },
          { company: searchRegex },
          { location: searchRegex },
          { experience: searchRegex },
          { salary: searchRegex },
          { category: searchRegex },
          { description: searchRegex },
          { skills: searchRegex },
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



export async function incrementClickCount(req, res) {
  try {
    const job = await Job.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { clickCount: 1 } },
      { new: true }
    );
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
      skills = [],
      role = "",
      postedAt,
    } = req.body;

    const parsedSkills = parseSkills(skills);

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
      description: normalizeDescription(description),
      applyUrl,
      skills: parsedSkills,
      role,
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
    const payload = { ...req.body };

    if ("description" in payload) {
      payload.description = normalizeDescription(payload.description);
    }

    if ("skills" in payload) {
      payload.skills = parseSkills(payload.skills);
    }

    const job = await Job.findOneAndUpdate(
      { slug: req.params.slug },
      payload,
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
