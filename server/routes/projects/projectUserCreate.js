import projectModel from "../../schemas/projectModel.js"

const projectUserCreate = async (req, res) => {
  const { projectId } = req.params
  const { userType, user } = req.body
  console.log(projectId, userType, user)
  //Validation
  if (
    (!projectId || projectId === "") ||
    (!userType || userType === "") ||
    (!user)
   ) {
    res.status(500).json({ "success": false, "message": "Project user info is not valid." })  
  }
  switch (userType) {
    case "Project Manager":
      console.log(`${user.email} is project manager`)
      const addPM = await projectModel.findOneAndUpdate({ _id: projectId }, { "$push": { "users": user }})
      res.status(200).json({ "message": "User was added to project." })
  }
}

export default projectUserCreate
