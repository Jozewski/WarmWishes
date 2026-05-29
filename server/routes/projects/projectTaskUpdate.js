import { getProjectById, updateProjectTask } from "../../database/helpers.js"

const projectTaskUpdate = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId)
    const project = getProjectById(projectId)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    const updatedTask = updateProjectTask(projectId, req.body?._id, req.body || {}, req.body?.taskIndex)

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      })
    }

    res.json({
      success: true,
      data: updatedTask,
    })
  } catch (error) {
    console.error("Project task update error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Error updating project task",
    })
  }
}

export default projectTaskUpdate
