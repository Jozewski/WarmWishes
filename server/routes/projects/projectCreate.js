
import { createProject } from "../../database/helpers.js"

const projectCreate = async (req, res) => {
  const {projectName, projectDescription, projectType, startDate, endDate, status, roles, tasks, users, user } = req.body
 // Validation
 if (
   (!projectName || projectName == "")
 ) {
  res.status(500).json({ "message": "Project information not valid."})
 }
 else{
  try {
    const newProject = createProject({projectName, projectDescription, projectType, startDate, endDate, status, roles, tasks, users, user})
    res.status(200).json({ "success": true, "message": "Project created." })
  } catch (error) {
    res.status(500).json({ "success": false, "message": "Failed to create project." })
  }
 }
}

export default projectCreate
