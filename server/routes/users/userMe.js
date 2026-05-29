
import jwt from "jsonwebtoken"
import { getUserByEmail } from "../../database/helpers.js"

const userMe = async (req, res) => {
  const { token } = req.params
  // Validation
  if (
    (!token || token == "")
  ) {
    res.status(500).json({ "message": "User not logged in or information not valid." })
  }
  else {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const loggedInUser = getUserByEmail(decoded.email)
      if (loggedInUser && loggedInUser.token.includes(token)) {
        // User logged in
        res.status(200).json({ "success": true, "message": "User logged in.", user: {
          firstName: loggedInUser.firstName, lastName: loggedInUser.lastName, email: loggedInUser.email, username: loggedInUser.username, roles: loggedInUser.roles
        }, token })
      }
      else {
        // User not logged in
        res.status(500).json({ "message": "User not logged in or information not valid." })
      }
    } catch (error) {
      res.status(500).json({ "message": "User not logged in or information not valid." })
    }
  }
}

export default userMe
