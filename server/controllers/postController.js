import Account from "../models/Account.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, avatarPath } = req.body;
    const user = await Account.findById(userId);
    if (user) {
      const p = new Post({
        userId,
        location: "A random location",
        description,
        avatarPath,
        userProfilePicturePath,
        likes: {},
        comments: [],
      });
      await p.save();
      p !== null
        ? res.status(201).json(p)
        : res.status(400).json({ message: "An error occurred." });
    } else {
      res.status(401);
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred:", error });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    allPosts !== null
      ? res.status(200).json(allPosts)
      : res.status(400).json({ message: "An error occurred." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred:", error });
  }
};

export const getAccountPosts = async (req, res) => {
  try {
    const { uid } = req.params;
    const post = await Post.find({ uid }); // Rough eq. to SELECT FROM post WHERE uid = uid;
    post !== null
      ? res.status(200).json(post)
      : res.status(404).json({ message: "Post not found." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred:", error });
  }
};

export const addLikeToPost = async (req, res) => {
  try {
      res.status(200).json({"message": "Not implemented yet."});
  } catch (error) {
    res.status(500).json({ message: "An error occurred:", error });
  }
};

export const removeLikeFromPost = async (req, res) => {
  try {
    res.status(200).json({"message": "Not implemented yet."});
  } catch (error) {
    res.status(500).json({ message: "An error occurred:", error });
  }
};
