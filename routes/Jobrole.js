import express from "express";
import { CreateJobrole, getJobRole, updaterole, delRole } from "../controllers/jobsRoleController.js";
import { authMiddleware } from "../middleware/Authmiddelware.js";

const router = express.Router();

router.post("/", authMiddleware, CreateJobrole);
router.get("/", getJobRole);
router.put("/:id", authMiddleware, updaterole);
router.delete("/:id", authMiddleware, delRole);
export default router;