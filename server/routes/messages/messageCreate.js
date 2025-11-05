import messageModel from "../../schemas/messageModel.js"

const messageCreate = async (req, res) => {
  const { projectId, projectName, senderId, senderName, messageType, content } = req.body

  // Validation
  if (!projectId || projectId === "") {
    return res.status(400).json({ message: "Project ID is required." })
  }

  if (!senderName || senderName === "") {
    return res.status(400).json({ message: "Sender name is required." })
  }

  if (!messageType || !['status_update', 'final_report'].includes(messageType)) {
    return res.status(400).json({ message: "Valid message type is required." })
  }

  if (!content || content === "") {
    return res.status(400).json({ message: "Message content is required." })
  }

  try {
    // Create new message
    const newMessage = await messageModel.create({
      projectId,
      projectName,
      senderId,
      senderName,
      messageType,
      content,
      createdAt: new Date(),
      isRead: false
    })

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: newMessage
    })
  } catch (error) {
    console.error("Error creating message:", error)
    res.status(500).json({ message: "Error creating message.", error: error.message })
  }
}

export default messageCreate
