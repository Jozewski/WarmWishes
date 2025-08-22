
import projectModel from "../../schemas/projectModel.js"
// import builderModel from "../../schemas/builderModel.js"
// import userModel from "../../schemas/userModel.js"


const projectCreate = async (req, res) => {
  const {projectName, projectDescription, projectType, startDate, endDate, status, roles, tasks, users, user } = req.body
  console.log("server create: ",projectName, projectDescription, projectType, startDate, endDate, status, roles, tasks, users, user)
 // Validation
 if (
   (!projectName || projectName == "") 
  //  (!projectDescription || projectDescription == "") ||
  //  (!projectType || projectType == "") 
  //  (!roles || roles == "") 
  //  (!tasks || tasks.length === 0) ||
  //  (!user || user.length === 0) 
  

 
  
 ) {
  res.status(500).json({ "message": "Project information not valid."})
 }
 else{
  // const newTasks = []
  // tasks.forEach(task => {
  //   newTasks.push({ taskName: task, users: [ ...users ] })
  // })
  // console.log(newTasks)
 
  const newProject = await projectModel.create({projectName, projectDescription, projectType, startDate, endDate, status, roles, tasks, users, user}) 

  console.log("newProject", newProject)
  res.status(200).json({ "success": true, "message": "Project created." })
 }
}

export default projectCreate
