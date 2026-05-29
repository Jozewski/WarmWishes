import { getProjectById } from "../../database/helpers.js"

const projectGetOne = async (req, res) => {
  const { projectId } = req.params

  // Validation
  if (!projectId || projectId === "") {
    res.status(500).json({ "success": false, "message": "Project information not valid." })
  }
  else {
    const getProject = getProjectById(parseInt(projectId))
    if (getProject) {
      res.status(200).json({ "success": true, "project": getProject })
    } else {
      res.status(404).json({ "success": false, "message": "Project not found." })
    }
  }
}

export default projectGetOne
