import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    username: String,
    tag: String,
    email_addy: String,
    password: String,
    bio: String,
    viewCount: String,
    location: String,
    path_to_avatar: {
      type: String,
      default: "default.jpg", // Default avatar path
    },
    friends: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true, // Will make createdAt and updatedAt so we don't have to do it ourselves
  }
);

const Account = mongoose.model("Account", accountSchema)
export default Account;