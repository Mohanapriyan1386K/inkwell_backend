// routes/companyRoutes.js

import express from "express";

import {
  getCompany,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  clickCompany
} from "../controllers/companyController.js";
import { authMiddleware } from "../middleware/Authmiddelware.js";

const router = express.Router();
router.get("/", getCompany);
router.get("/:companyname", getSingleCompany);
router.post("/", createCompany);
router.put("/:id", updateCompany);
router.post("/:id", clickCompany);
router.delete("/:id", deleteCompany);

export default router;