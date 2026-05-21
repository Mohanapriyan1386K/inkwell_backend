import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    company: { type: String, default: "" },
    location: { type: String, default: "" },
    experience: { type: String, default: "" },
    salary: { type: String, default: "" },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    applyUrl: { type: String, default: "" },
    postedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
