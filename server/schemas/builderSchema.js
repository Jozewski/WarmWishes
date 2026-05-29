import mongoose from "mongoose";

const Schema = mongoose.Schema;

const builderSchema = new Schema({
  projectType: {
    type: String,
    default: "",
  },

  roles: [String],
  tasks: [{ taskName: String }],
  user: {
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    roles: [String],
  },
});

export default builderSchema;
