import mongoose from "mongoose";

const Schema = mongoose.Schema;

// _id, name, description, startDate, endDate, customer: {}, tasks: [], users: []

const projectSchema = new Schema({
  projectName: {
    type: String,
    default: "",
  },
  projectDescription: {
    type: String,
    default: "",
  },
  projectType: String,
  startDate: {
    type: String,
    default: "",
  },
  endDate: {
    type: String,
    default: "",
  },
  status: String, 
  tasks: [String],
  users: [
    {
      firstName: String,
      lastName: String,
      email: String,
      username: String,
      roles: [String],
    },
  ],

  user: {
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    roles: [String],
  },
  donations: [
    {
      donatedItem: {
        type: String,
        default: "",
      },
      numberOfItems: {
        type: Number,
        default: 0,
      },
      category: {
        type: String,
        default: "",
      },
      dateReceived: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  donationSummary: {
    totalItems: {
      type: Number,
      default: 0,
    },
    lastUpdated: Date,
    description: String,
  },
});

export default projectSchema;
