import Job from "../models/Job.js";
import { slugify } from "../utils/slugify.js";

export async function getJobs(req, res) {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
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
