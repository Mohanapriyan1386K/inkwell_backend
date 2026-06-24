import Interview from "../models/QuestionSchema.js";

// 1. Create Role

export const createRole = async (req, res) => {

    try {

        const { role } = req.body;

        const existing = await Interview.findOne({ role });

        if (existing) {

            return res.status(400).json({

                success: false,

                message: "Role already exists",

            });

        }

        const interview = await Interview.create({ role });

        res.status(201).json({

            success: true,

            message: "Role created successfullys",

            data: interview,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// 2. Get All Roles with Questions

export const getAllRoles = async (req, res) => {

    try {

        const interviews = await Interview.find().sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: interviews.length,

            data: interviews,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// 3. Get Single Role

export const getSingleRole = async (req, res) => {

    try {

        const { role } = req.params;

        const interview = await Interview.findOne({ role });

        if (!interview) {

            return res.status(404).json({

                success: false,

                message: "Role not founds",

            });

        }

        res.status(200).json({

            success: true,

            data: interview,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// 4. Add Question to Role

export const addQuestion = async (req, res) => {
    try {
        const { role } = req.params;

        let questionsToAdd = [];

        // Multiple questions
        if (Array.isArray(req.body.questions)) {
            questionsToAdd = req.body.questions;
        }
        // Single question
        else if (req.body.question) {
            questionsToAdd = [
                {
                    question: req.body.question,
                    answer: req.body.answer,
                    difficulty: req.body.difficulty,
                },
            ];
        } else {
            return res.status(400).json({
                success: false,
                message: "Question data is required",
            });
        }

        const interview = await Interview.findOneAndUpdate(
            { role },
            {
                $push: {
                    questions: {
                        $each: questionsToAdd,
                    },
                },
            },
            { new: true }
        );

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Role not found",
            });
        }

        res.status(200).json({
            success: true,
            message: `${questionsToAdd.length} question(s) added successfully`,
            data: interview,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 5. Update Question

export const updateQuestion = async (req, res) => {

    try {

        const { role, questionId } = req.params;

        const { question, answer, difficulty } = req.body;

        const interview = await Interview.findOneAndUpdate(

            { role, "questions._id": questionId },

            {

                $set: {

                    "questions.$.question": question,

                    "questions.$.answer": answer,

                    "questions.$.difficulty": difficulty,

                },

            },

            { new: true }

        );

        if (!interview) {

            return res.status(404).json({

                success: false,

                message: "Question not found",

            });

        }

        res.status(200).json({

            success: true,

            message: "Question updated successfully",

            data: interview,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// 6. Delete Question

export const deleteQuestion = async (req, res) => {

    try {

        const { role, questionId } = req.params;

        const interview = await Interview.findOneAndUpdate(

            { role },

            {

                $pull: {

                    questions: { _id: questionId },

                },

            },

            { new: true }

        );

        if (!interview) {

            return res.status(404).json({

                success: false,

                message: "Role not found",

            });

        }

        res.status(200).json({

            success: true,

            message: "Question deleted successfully",

            data: interview,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// 7. Delete Entire Role

export const deleteRole = async (req, res) => {

    try {

        const { role } = req.params;

        const interview = await Interview.findOneAndDelete({ role });

        if (!interview) {

            return res.status(404).json({

                success: false,

                message: "Role not found",

            });

        }

        res.status(200).json({

            success: true,

            message: "Role deleted successfully",

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};