import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "Question is required"],
            trim: true,
        },

        answer: {
            type: String,
            required: [true, "Answer is required"],
            trim: true,
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Medium",
        },
    },
    {
        _id: true,
    }
);

const InterviewSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: [true, "Role is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        questions: {
            type: [QuestionSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Interview", InterviewSchema);