// models/Company.js

import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyname: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;