import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";
import Account from "../models/Account.js";

/**
 * Create new user
 * Added export here so we don't have to export default everything again
 */
export const createAccount = async (req, res) => {
  try {
    const {
      username,
      tag,
      email_addy,
      password,
      bio,
      viewCount,
      location,
      path_to_avatar,
      friends,
      likes,
    } = req.body;
    const cleanPw = password.toString();
    const hashedPw = await bcrypt.hash(cleanPw, 10);
    const acc = new Account({
      username,
      tag,
      email_addy,
      password: hashedPw,
      bio,
      viewCount,
      location,
      path_to_avatar,
      friends,
      likes,
    });
    const savedAccount = await acc.save();
    if (savedAccount !== null) {
      res.status(200).json(savedAccount);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Log in to account
 * Will do password check, etc. to make sure you are who you say you are
 */
export const loginToAccount = async (req, res) => {
  try {
    const { email_addy, password } = req.body;
    const account = Account.findOne({ email: email_addy });

    if (!account) res.status(404).json({ message: "User does not exist." }); // Can't really do anything here :/

    const doPasswordsMatch = await bcrypt.compare(
      password,
      account.password,
      () => {}
    );
    if (!doPasswordsMatch)
      // Whoops, that's a swing and a miss!
      res.status(403).json({ message: "Incorrect email address or password." });

    // Sign in using our web token
    const loginToken = jwt.sign({ id: account._id }, process.env.TOKEN_KEY);
    delete user.password; // Just to make sure we didn't leave anything lying around.

    // Finally, we're done if everything worked out well so far - spit out the token and let's go.
    res.status(200).json({ loginToken, account });
  } catch (error) {
    res.json({ message: error.message }); // Using .status() triggered a bug, this (supposedly) fixes it.
  }
};

export const logoutFromAccount = async (req, res) => {
  res.json({ message: "You may log out by deleting your cookies." });
};

export const getSelf = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);
    if (account !== null) res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSelfFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);
    const friends = await Promise.all(
      account.friends.map((id) => {
        Account.findById(id);
      })
    );
    if (friends !== null) res.status(200).json(friends);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { uid } = req.params;
    const account = await Account.findById(id);
    if (account) {
      const wasDeleted = await Account.deleteOne({ uid });
      if (wasDeleted) {
        res.status(200).json({ message: "Account deleted." });
      } else {
        res.status(400).json({ message: "Something went wrong. Please try again." });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addFriend = async (req, res) => {
  // Not implemented yet
  res.send("OK");
};

export const removeFriend = async (req, res) => {
  // Not implemented yet
  res.send("OK");
};
