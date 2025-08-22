
import jwt from "jsonwebtoken"
import userModel from "../../schemas/userModel.js"

const userMe = async (req, res) => {
  const { token } = req.params
  // Validation
  if (
    (!token || token == "")
  ) {
    res.status(500).json({ "message": "User not logged in or information not valid." })
  }
  else {
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    console.log("decoded", decoded)
    const loggedInUser = await userModel.findOne({ email: decoded.email })
    console.log("loggedInUser", loggedInUser)
    if (loggedInUser.token.includes(token)) {
      // User logged in
      res.status(200).json({ "success": true, "message": "User logged in.", user: {
        firstName: loggedInUser.firstName, lastName: loggedInUser.lastName, email: loggedInUser.email, username: loggedInUser.username, roles: loggedInUser.roles
      }, token })
    }
    else {
      // User not logged in
      res.status(500).json({ "message": "User not logged in or information not valid." })
    }
  }
}

export default userMe
