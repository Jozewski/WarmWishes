
import builderModel from "../../schemas/builderModel.js"

const builderCreate = async (req, res) => {
    const {projectType, tasks, roles, user } = req.body
   // Validation
   if (
     (!projectType || projectType == "" ) ||   
     (!roles || roles === 0 ) || 
     (!tasks || tasks === 0 ) || 
     (!user || user === 0 ) 
    
    
    
   ) {
    res.status(500).json({ "message": "Project builder information not valid."})
   }
   else{

   
    const newBuilder = await builderModel.create({projectType, tasks, roles, user}) 

    console.log("newBuilder", newBuilder)
    res.status(200).json({ "success": true, "message": "Project  builder created." })
   }
}
export default builderCreate