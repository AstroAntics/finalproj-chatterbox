import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: String,
    location: String,
    description: String,
    avatarPath: String,
    userProfilePicPath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
    deleted: Boolean,
    hidden: Boolean,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
