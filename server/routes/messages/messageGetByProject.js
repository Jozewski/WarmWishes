import messageModel from "../../schemas/messageModel.js"

const messageGetByProject = async (req, res) => {
  const { projectId } = req.params

  if (!projectId || projectId === "") {
    return res.status(400).json({ message: "Project ID is required." })
  }

  try {
    const messages = await messageModel.find({ projectId }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      messages
    })
  } catch (error) {
    console.error("Error fetching messages for project:", error)
    res.status(500).json({ message: "Error fetching messages.", error: error.message })
  }
}

export default messageGetByProject
