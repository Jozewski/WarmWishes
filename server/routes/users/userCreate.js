import * as argon2 from "argon2";
import { createUser } from "../../database/helpers.js"

const userCreate = async (req, res) => {
    const {firstName, lastName, email, username, password, roles } = req.body
   if (
     (!firstName || firstName == "") ||
     (!lastName || lastName == "") ||
     (!email || email == "") ||
     (!username || username == "") ||
     (!password || password == "") ||
     (!roles || roles === 0)
   ) {
    res.status(500).json({ "message": "User information not valid."})
   }
   else{
    try {
      const hashedPassword = await argon2.hash(password)
      const newUser = createUser({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
        roles: [ roles ]
      })
      res.status(200).json({ "success": true, "message": "User created." })
    } catch (error) {
      // Handle unique constraint violations
      if (error.message.includes('UNIQUE constraint failed')) {
        res.status(400).json({ "success": false, "message": "Email or username already exists." })
      } else {
        res.status(500).json({ "success": false, "message": "Failed to create user." })
      }
    }
   }
}

export default userCreate