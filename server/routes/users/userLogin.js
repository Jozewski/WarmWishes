import * as argon2 from "argon2"
import jwt from "jsonwebtoken"
import userModel from "../../schemas/userModel.js"

const userLogin = async (req, res) => {
  const { email, password  } = req.body
  // Validation
  if (
    (!email || email == "") ||
    (!password || password == "")
  ) {
    return res.status(401).json({ "success": false, "message": "Invalid credentials." })
  }

  // Get user by email (without password)
  const loginUser = await userModel.findOne({ email })
  console.log("loginUser", loginUser)
  // If user email not found
  if (!loginUser) {
    return res.status(401).json({ "success": false, "message": "Invalid credentials." })
  }
  const isPasswordCorrect = await argon2.verify(loginUser.password, password)
  // If password is incorrect
  if (!isPasswordCorrect) {
    return res.status(401).json({ "success": false, "message": "Invalid credentials." })
  }
  // If user exists and password is correct
  console.log(process.env.SECRET_KEY)
  const key = process.env.SECRET_KEY || ""
  const jwtExpire = process.env.JWT_EXPIRE || "24h"
  const token = jwt.sign({ email }, key, { expiresIn: jwtExpire })
  console.log("token", token)
  loginUser.token.push(token)
  loginUser.save()
  console.log("loginUser:", loginUser)
  const user = { firstName: loginUser.firstName, lastName: loginUser.lastName, email: loginUser.email, token: loginUser.token, roles: loginUser.roles, }
  res.status(200).json({ "success": true, "message": "User logged in.", user })
}

export default userLogin
