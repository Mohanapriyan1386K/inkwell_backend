import express from "express";
import { CreateJobrole, getJobRole, updaterole, delRole } from "../controllers/jobsRoleController.js";
import { authMiddleware } from "../middleware/Authmiddelware.js";

const router = express.Router();

router.post("/", CreateJobrole);
router.get("/", getJobRole);
router.put("/:id", updaterole);
router.delete("/:id", delRole);
export default router;