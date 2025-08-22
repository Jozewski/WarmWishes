
import projectModel from "../../schemas/projectModel.js"

const projectGetMany = async (req, res) => {
  const { email } = req.params
  console.log("email", email)
  
  // Validation
  if (!email || email === "") {
    res.status(500).json({ "message": "Project information not valid." })
  }
  else {
    const getProjects = await projectModel.find({ $or: [ { "user.email": email }, { "users.email": email } ] })
    console.log("getProjects", getProjects)
    res.status(200).json({ "success": true, "projects": getProjects })
  }
}
export default projectGetMany