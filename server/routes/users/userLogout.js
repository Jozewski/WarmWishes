import jwt from "jsonwebtoken"
import { getUserByEmail, updateUser } from "../../database/helpers.js"

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
    try {
      // Logout user, remove token
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const logoutUser = getUserByEmail(decoded.email)
      if (logoutUser) {
        updateUser(logoutUser.id, { token: [] })
        res.status(200).json({ "success": true, "message": "User logged out." })
      } else {
        res.status(500).json({ "message": "User not found." })
      }
    } catch (error) {
      res.status(500).json({ "message": "Invalid token." })
    }
  }
}

export default userLogout
