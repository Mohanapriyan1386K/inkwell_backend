// controllers/companyController.js

import Company from "../models/Company.js";


// ================= GET ALL COMPANY =================

export async function getCompany(req, res) {
  try {
    const companies = await Company.find();

    res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


// ================= GET SINGLE COMPANY =================

export async function getSingleCompany(req, res) {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


// ================= CREATE COMPANY =================

export async function createCompany(req, res) {
  try {
    const { companyname, location, coverImage } = req.body;

    const newCompany = await Company.create({
      companyname,
      location,
      coverImage,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: newCompany,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


// ================= UPDATE COMPANY =================

export async function updateCompany(req, res) {
  try {
    const { id } = req.params;

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      data: updatedCompany,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}



export async function deleteCompany(req, res) {
  try {
    const { id } = req.params;

    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}