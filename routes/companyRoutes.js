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
router.get("/:id", getSingleCompany);
router.post("/", authMiddleware, createCompany);
router.put("/:id", authMiddleware, updateCompany);
router.post("/:id", clickCompany);
router.delete("/:id", authMiddleware, deleteCompany);

export default router;