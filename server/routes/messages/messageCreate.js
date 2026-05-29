import { createMessage, getProjectById } from "../../database/helpers.js"

const messageCreate = async (req, res) => {
  try {
    const message = req.body

    if (!message?.projectId || !message?.senderName || !message?.messageType || !message?.content) {
      return res.status(400).json({
        success: false,
        message: "projectId, senderName, messageType, and content are required",
      })
    }

    const projectId = Number(message.projectId)
    const project = getProjectById(projectId)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    const createdMessage = createMessage({
      ...message,
      projectId,
      projectName: message.projectName || project.projectName,
    })

    res.status(201).json({
      success: true,
      data: createdMessage,
    })
  } catch (error) {
    console.error("Message create error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Error creating message",
    })
  }
}

export default messageCreate
