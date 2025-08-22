import projectModel from "../../schemas/projectModel.js"
import buildeModel from "../../schemas/builderModel.js"
import userModel from "../../schemas/userModel.js"

const projectTaskUpdate = async (req, res) => {
  const { projectId } = req.params
  const { taskIndex, taskName, taskDescription, startDate, endDate, status, hoursEstimated, hoursWorked, roles, users } = req.body
  
  // Validation
  if (
    (!taskName || taskName === "") || 
    (!taskDescription || taskDescription === "") || 
    // (!status || status === "") || 
    (hoursEstimated === "") ||
    (hoursWorked === "")
  ) {
    res.status(500).json({ "message": "Project task information not valid." })
  }
  else {
    const updateProjectTask = await projectModel.updateOne({ _id: projectId }, { "$set": { [`tasks.${taskIndex}`]: { taskName, taskDescription, startDate, endDate, status, hoursEstimated, hoursWorked, roles, users } }})
    console.log("updateProjectTask", updateProjectTask)
    res.status(200).json({ "success": true, "message": "Project task updated." })
  }
}

export default projectTaskUpdate


// firstName: String , lastName: String, email: String, username: String, roles: [ String ]
