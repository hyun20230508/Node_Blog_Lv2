const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

postsSchema.virtual("postId").get(function () {
  return this._id.toHexString();
});

postsSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("posts", postsSchema);
