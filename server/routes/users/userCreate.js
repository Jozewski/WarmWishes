import * as argon2 from "argon2";
import userModel from "../../schemas/userModel.js"

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

    const hashedPassword = await argon2.hash(password)
    const newUser = await userModel.create({ firstName, lastName, email, username, password: hashedPassword, roles: [ roles ] })
    console.log("newUser", newUser)
    res.status(200).json({ "success": true, "message": "User created." })
   }
}

export default userCreate