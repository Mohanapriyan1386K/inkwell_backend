import express from "express";
import { getJobs, getJobBySlug, createJob, updateJob, deleteJob, incrementClickCount } from "../controllers/jobController.js";
import { validateJob } from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/:slug", getJobBySlug);
router.post("/", validateJob, createJob);
router.put("/:slug", updateJob);
router.delete("/:slug", deleteJob);
router.post("/:slug/click", incrementClickCount);
export default router;
