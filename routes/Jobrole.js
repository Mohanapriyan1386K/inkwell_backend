import express from "express";
import { CreateJobrole, getJobRole, updateRole, delRole } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", CreateJobrole);
router.get("/", getJobRole);
router.put("/:id", updateRole);
router.delete("/:id", delRole);
export default router;