import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var BlogModel = mongoose.model("BlogModel", blogSchema);

export default BlogModel;
