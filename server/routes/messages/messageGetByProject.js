import { getMessagesByProjectId } from "../../database/helpers.js"

const messageGetByProject = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId)

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Valid projectId is required",
      })
    }

    const messages = getMessagesByProjectId(projectId)

    res.json({
      success: true,
      data: messages,
    })
  } catch (error) {
    console.error("Message get by project error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Error getting project messages",
    })
  }
}

export default messageGetByProject
