// Pull in imports.
import express from "express";
import { loginToAccount, logoutFromAccount, deleteAccount } from "../controllers/user.js";

// This system uses the Express router. See docs for more information.
const router = express.Router();
router.post("/login", loginToAccount);
router.post("/logout", logoutFromAccount);
router.post("/delete-account", deleteAccount)

export default router;