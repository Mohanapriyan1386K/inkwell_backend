import express from "express";
import { getJobs, getJobBySlug, createJob, updateJob, deleteJob, incrementClickCount } from "../controllers/jobController.js";
import { validateJob } from "../middleware/validateRequest.js";
import { authMiddleware } from "../middleware/Authmiddelware.js";
const router = express.Router();

router.get("/", getJobs);
router.get("/:slug", getJobBySlug);
router.post("/", authMiddleware, validateJob, createJob);
router.put("/:slug", authMiddleware, updateJob);
router.delete("/:slug", authMiddleware, deleteJob);
router.post("/:slug/click", incrementClickCount);
export default router;
