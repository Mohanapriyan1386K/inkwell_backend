// models/Company.js

import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyname: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
    },

    location: {
      type: String,
      default: "",
    },

    jobs: [
      {
        title: String,
        description: String,
        experience: String,
        location: String,
        applyLink: String,
        skills: [String]
      }
    ],

    coverImage: {
      type: String,
      default: "",
    },
    clickCount: { type: Number, default: 0 },
    siteLink: {
      type: String,
      default: "",
    },
    companytype: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

const Company = mongoose.model("Company", companySchema);

export default Company;
