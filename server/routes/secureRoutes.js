// Pull in imports.
import express from "express";
import { loginToAccount } from "../controllers/user.js";

// This system uses the Express router. See docs for more information.
const router = express.Router();
router.post("/login", loginToAccount);

export default router;