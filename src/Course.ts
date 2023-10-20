import mongoose from "mongoose";

const Course = new mongoose.Schema({
  author: { type: String, reuqired: true },
  title: { type: String, reuqired: true },
  content: { type: String, reuqired: true },
  picture: { type: String },
});

export default mongoose.model("Course", Course);
