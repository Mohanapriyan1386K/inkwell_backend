import express from "express";

import {

    createRole,

    getAllRoles,

    getSingleRole,

    addQuestion,

    updateQuestion,

    deleteQuestion,

    deleteRole,

} from "../controllers/interviewController.js";

const router = express.Router();

// Role CRUDsss

router.post("/role", createRole);

router.get("/roles", getAllRoles);

router.get("/role/:role", getSingleRole);

router.delete("/role/:role", deleteRole);

// Question CRUD

router.post("/role/:id/question", addQuestion);

router.put("/role/:role/question/:questionId", updateQuestion);

router.delete("/role/:role/question/:questionId", deleteQuestion);

export default router;