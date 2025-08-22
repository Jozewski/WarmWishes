import jwt from "jsonwebtoken"
import userModel from "../../schemas/userModel.js"

const userLogout = async (req, res) => {
  // TODO: Get token from header
  const { token } = req.params
  // If token
  if (
    (!token || token == "")
  ) {
    res.status(500).json({ "message": "User information not valid." })
  }
  else {
    // Logout user, remove token
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const logoutUser = await userModel.findOne({ email: decoded.email })
    console.log("logoutUser", logoutUser)
    logoutUser.token = []
    await logoutUser.save()
    res.status(200).json({ "success": true, "message": "User logged out." })
  }
}

export default userLogout
