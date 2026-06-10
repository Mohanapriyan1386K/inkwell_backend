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

    siteLink: {
      type: String,
      default: "",
    },
    companytype: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
  { clickCount: { type: Number, default: 0 } }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
