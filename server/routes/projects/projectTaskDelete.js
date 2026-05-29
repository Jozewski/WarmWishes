import { deleteProjectTask, getProjectById } from "../../database/helpers.js"

const projectTaskDelete = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId)
    const taskId = Number(req.params.taskId)
    const project = getProjectById(projectId)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    const deleted = deleteProjectTask(projectId, taskId)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      })
    }

    res.json({
      success: true,
    })
  } catch (error) {
    console.error("Project task delete error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting project task",
    })
  }
}

export default projectTaskDelete
