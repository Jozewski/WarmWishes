import projectModel from "../../schemas/projectModel.js"

const projectGetOne = async (req, res) => {
  const { projectId } = req.params

  // Validation
  if (!projectId || projectId === "") {
    res.status(500).json({ "success": false, "message": "Project information not valid." })
  }
  else {
    const getProject = await projectModel.findOne({ _id: projectId })
    res.status(200).json({ "success": true, "project": getProject })
  }
}

export default projectGetOne
