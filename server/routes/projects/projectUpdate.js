
import projectModel from "../../schemas/projectModel.js"
// import builderModel from "../../schemas/builderModel.js"
// import userModel from "../../schemas/userModel.js"


const projectUpdate = async (req, res) => {
  const { projectId } = req.params
  const {projectName, startDate, endDate, status} = req.body
 // Validation
 if (
   (!projectName || projectName == "") ||  
   (!status || status == "")  
  //  (!users || users.length === 0) 
  
 ) {
  res.status(500).json({ "message": "Project information not valid."})
 }
 else{ 
 
  const updateProject = await projectModel.updateOne({_id:projectId},{projectName, startDate, endDate, status }) 

  console.log("updateProject", updateProject)
  res.status(200).json({ "success": true, "message": "Project Updated." })
 }
}

export default projectUpdate
