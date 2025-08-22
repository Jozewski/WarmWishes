import mongoose from "mongoose"
import contactSchema from "./contactSchema.js"

contactSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id
    delete ret._id  
    delete ret.__v
    return ret
  }
})


const contactModel = mongoose.model("contact", contactSchema)

export default contactModel