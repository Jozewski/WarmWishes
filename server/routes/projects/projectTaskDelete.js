import projectModel from "../../schemas/projectModel.js"
import buildeModel from "../../schemas/builderModel.js"
import userModel from "../../schemas/userModel.js"

const projectTaskDelete = async (req, res) => {
  const { projectId, taskId } = req.params
  console.log(projectId, taskId)

  // Validation
  if (
    (!projectId || projectId === "") || 
    (!taskId || taskId === "")
  ) {
    res.status(500).json({ "message": "Project task information not valid." })
  }
  else {
    const updateProjectTask = await projectModel.updateOne({ _id: projectId }, { $pull: { tasks: { _id: taskId } }})
    console.log("updateProjectTask", updateProjectTask)
    res.status(200).json({ "success": true, "message": "Project task updated." })
  }
}

export default projectTaskDelete


// firstName: String , lastName: String, email: String, username: String, roles: [ String ]
