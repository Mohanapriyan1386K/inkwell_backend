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

const router = express.Router();


// GET ALL
router.get("/", getCompany);


// GET SINGLE
router.get("/:id", getSingleCompany);

// CREATE
router.post("/", createCompany);

// UPDATE
router.put("/:id", updateCompany);
// CLICK
router.post("/:id", clickCompany);
// DELETE
router.delete("/:id", deleteCompany);

export default router;