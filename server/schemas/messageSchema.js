import mongoose from "mongoose"

const Schema = mongoose.Schema

const messageSchema = new Schema({
  projectId: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    default: ""
  },
  senderId: {
    type: String,
    default: ""
  },
  senderName: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    enum: ['status_update', 'final_report'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  }
})

export default messageSchema
