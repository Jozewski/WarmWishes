import { getProjectById, updateProject } from "../../database/helpers.js"

const projectUpdate = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId)
    const project = getProjectById(projectId)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    const updatedProject = updateProject(projectId, req.body || {})

    res.json({
      success: true,
      data: updatedProject,
    })
  } catch (error) {
    console.error("Project update error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Error updating project",
    })
  }
}

export default projectUpdate
