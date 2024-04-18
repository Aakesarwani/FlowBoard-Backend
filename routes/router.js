import express from "express";
import auth from "./auth.js"
import board from "./board.js"
import section from "./section.js"
import task from "./task.js";

const router=express.Router();

router.use('/auth', auth);
router.use('/boards',board);
router.use('/boards/:boardId/sections',section)
router.use('/boards/:boardId/tasks',task);

export default router;