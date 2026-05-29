import { addUserToProject, getProjectById } from "../../database/helpers.js"

const projectUserCreate = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId)
    const { userType, user } = req.body || {}

    const project = getProjectById(projectId)
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    if (!user?.email) {
      return res.status(400).json({
        success: false,
        message: "User email is required",
      })
    }

    const updatedProject = addUserToProject(projectId, userType, user)

    res.status(201).json({
      success: true,
      data: updatedProject,
    })
  } catch (error) {
    console.error("Project user create error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Error adding project user",
    })
  }
}

export default projectUserCreate
