import express from "express";
import isAuthenticated from "../middleware/isAuthenticated"
import { addExpense } from "../controllers/expense.controller";
const router=express.Router();
 
router.route("/add").post(isAuthenticated,addExpense);

export default router;
