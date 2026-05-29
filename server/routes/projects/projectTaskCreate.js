import { createProjectTask, getProjectById } from "../../database/helpers.js"

const projectTaskCreate = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId)
    const project = getProjectById(projectId)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    const createdTask = createProjectTask(projectId, req.body || {})

    res.status(201).json({
      success: true,
      data: createdTask,
    })
  } catch (error) {
    console.error("Project task create error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Error creating project task",
    })
  }
}

export default projectTaskCreate
