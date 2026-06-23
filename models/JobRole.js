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
            default: false
        },

    },
    { timestamps: true }
)

export default mongoose.model("JobRole", jobRoleSchema)