import mongoose from "mongoose"

// TODO: Make sure email and username are unique

const Schema = mongoose.Schema

const userSchema = new Schema({
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
  username: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  roles: [ String ],
  token: {
    type: [ String ]
  }
})

export default userSchema


