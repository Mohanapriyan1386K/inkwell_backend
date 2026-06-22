import mongoose from "mongoose";

const jobRoleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        status: {
            type: Boolean,
            default: true
        },

    },
    { timestamps: true }
)

export default mongoose.model("JobRole", jobRoleSchema)