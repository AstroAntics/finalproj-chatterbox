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
    const randomSalt = bcrypt.genSalt(); // Do random bcrypt gen here (thanks StackOverflow)
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

    const doPasswordsMatch = await bcrypt.compare(password, account.password, () => {});
    if (!doPasswordsMatch) // Whoops, that's a swing and a miss!
      res.status(403).json({ message: "Incorrect email address or password." });

    // Sign in using our web token
    const loginToken = jwt.sign({id: account._id}, process.env.TOKEN_KEY);
    delete user.password; // Just to make sure we didn't leave anything lying around.

    // Finally, we're done if everything worked out well so far - spit out the token and let's go.
    res.status(200).json({loginToken, account});

  } catch (error) {
    res.json({ message: error.message }); // Using .status() triggered a bug, this (supposedly) fixes it.
  }
};
