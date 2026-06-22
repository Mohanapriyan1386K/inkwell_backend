import express from "express";
import { CreateJobrole, getJobRole, updateRole, delRole } from "../controllers/jobController.js";
import { authMiddleware } from "../middleware/Authmiddelware.js";

const router = express.Router();

router.post("/", authMiddleware, CreateJobrole);
router.get("/", getJobRole);
router.put("/:id", authMiddleware, updateRole);
router.delete("/:id", authMiddleware, delRole);
export default router;