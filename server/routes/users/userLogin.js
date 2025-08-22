import * as argon2 from "argon2"
import jwt from "jsonwebtoken"
import userModel from "../../schemas/userModel.js"

// TODO: Create token and store in user.token array
// TODO: Return above token on successful login

const userLogin = async (req, res) => {
  const { email, password  } = req.body
  // Validation
  if (
    (!email || email == "") || 
    (!password || password == "") 
  ) {
    res.status(500).json({ "message": "User information not valid." })
  }
  else {
    // Get user by email (without password)
    const loginUser = await userModel.findOne({ email })
    console.log("loginUser", loginUser)
    // If user email not found
    if (!loginUser) {
      res.status(500).json({ "success": false, "message": "User information not valid." })
    }
    const isPasswordCorrect = await argon2.verify(loginUser.password, password)
    // If password is incorrect
    if (!isPasswordCorrect) {
      res.status(500).json({ "success": false, "message": "User information not valid." })
    }
    // If user exists and paswword is correct
    console.log(process.env.SECRET_KEY)
    const key = process.env.SECRET_KEY || ""
    const token = jwt.sign({ email }, key)
    console.log("token", token)
    loginUser.token.push(token)
    loginUser.save()
    console.log("loginUser:", loginUser)
    const user = { firstName: loginUser.firstName, lastName: loginUser.lastName, email: loginUser.email, token: loginUser.token, roles: loginUser.roles, }
    res.status(200).json({ "success": true, "message": "User logged in.", user })
  }
}

export default userLogin
