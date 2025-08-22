import mongoose from "mongoose"

// TODO: Make sure email and username are unique

const Schema = mongoose.Schema

const contactSchema = new Schema({
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  projectType: {
    type: String,
    default: ""
  },
  message: {
    type: String,
    default: ""
  }

})

export default contactSchema