import { getAllUsers } from "../../database/helpers.js"

const userGetMany = async (req, res) => {
  const userList = getAllUsers()
  res.status(200).json({ "success": true, users: userList })
}

export default userGetMany
