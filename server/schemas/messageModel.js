import mongoose from "mongoose"
import messageSchema from "./messageSchema.js"

const messageModel = mongoose.model("Message", messageSchema)

export default messageModel
