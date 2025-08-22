
import projectModel from "../../schemas/projectModel.js"
import builderModel from "../../schemas/builderModel.js"
import userModel from "../../schemas/userModel.js"
const projectTaskUpdate = async (req, res) => {
  const { projectId } = req.params
  const { taskIndex, taskName, taskDescription, startDate, endDate, status, hoursEstimated, hoursWorked, roles = [], users = [] } = req.body
  
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
    const updateProjectTask = await projectModel.findOne({ _id: projectId })
    console.log("updateProjectTask", updateProjectTask)
    updateProjectTask.tasks.push({ taskIndex, taskName, taskDescription, startDate, endDate, status, hoursEstimated, hoursWorked, roles, users })
    updateProjectTask.save()
    res.status(200).json({ "success": true, "message": "Project task added." })
  }
}
export default projectTaskUpdate