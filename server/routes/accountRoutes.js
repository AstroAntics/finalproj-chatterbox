import express from "express";
import {
  getSelf,
  getSelfFriends,
  addFriend,
  removeFriend,
} from "../controllers/user.js";

const router = express.Router();

// USER ACCOUNT ROUTES
router.get('/:id', getSelf); // Fetch account
router.get('/:id/friends', getSelfFriends); // Fetch account friends
router.get('/:id/:friendId/add', addFriend); // Add friend
router.get('/:id/:friendId/remove', removeFriend); // Remove friend

export default router;